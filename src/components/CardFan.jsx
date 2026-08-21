import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useCardBack } from '../lib/cardBack.jsx';

const FAN_N = 30;            // số lá bày ra quạt
const MAX_ANGLE = 33;        // độ nghiêng của lá ngoài cùng
const ARC_DEPTH = 58;        // độ võng của vòng cung (px)
const HOVER_LIFT = 34;       // lá nhô lên khi rê chuột (px)
const DEAL_STEP = 26;        // độ trễ trải từng lá (ms)
const DEAL_SETTLE = 700;

/**
 * Quạt bài trải ngang đáy bàn.
 *
 * Vị trí từng lá tính thẳng từ vị trí tương đối u ∈ [-1, 1]: lệch ngang theo u,
 * võng xuống theo u² và nghiêng theo u. Nhờ vậy bề rộng quạt co giãn theo khung
 * mà hình dáng vòng cung vẫn giữ nguyên.
 *
 * Quạt chỉ lo phần bày bài và báo ra "vừa bốc lá nào" — chuyện lá đi đâu sau đó
 * do bàn bài (DrawScreen) cầm, vì chỉ nó mới biết các ô.
 */
export default function CardFan({ taken, grabbed, disabled, onPickUp }) {
  const cardBack = useCardBack();
  const [hover, setHover] = useState(null);
  const [dealt, setDealt] = useState(false);
  const [dealing, setDealing] = useState(true);
  const [spreadX, setSpreadX] = useState(360);
  const rootRef = useRef(null);

  // Quạt rộng theo khung, nhưng không rộng quá thành lưa thưa.
  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const measure = () => setSpreadX(Math.min(el.clientWidth * 0.44, 430));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Trải quạt ra khi vào bàn bài.
  useEffect(() => {
    const open = setTimeout(() => setDealt(true), 40);
    const settle = setTimeout(() => setDealing(false), 40 + FAN_N * DEAL_STEP + DEAL_SETTLE);
    return () => {
      clearTimeout(open);
      clearTimeout(settle);
    };
  }, []);

  const geometry = (i) => {
    const half = (FAN_N - 1) / 2;
    const u = (i - half) / half;
    return { x: u * spreadX, y: u * u * ARC_DEPTH, angle: u * MAX_ANGLE };
  };

  const handleDown = (i) => (e) => {
    if (disabled || taken.has(i) || grabbed != null) return;
    e.preventDefault();
    const box = e.currentTarget.getBoundingClientRect();
    onPickUp(i, {
      x: e.clientX,
      y: e.clientY,
      // Lệch giữa con trỏ và tâm lá, để lá không nhảy giật vào con trỏ.
      offsetX: box.left + box.width / 2 - e.clientX,
      offsetY: box.top + box.height / 2 - e.clientY,
      rotate: geometry(i).angle,
    });
  };

  return (
    <div className="fan" ref={rootRef}>
      {Array.from({ length: FAN_N }, (_, i) => {
        const { x, y, angle } = geometry(i);
        const gone = taken.has(i) || grabbed === i;
        const live = !gone && !disabled;
        const lifted = live && hover === i;

        const resting =
          `translateX(${x}px) translateY(${y - (lifted ? HOVER_LIFT : 0)}px) ` +
          `rotate(${angle}deg) scale(${lifted ? 1.07 : 1})`;
        const stacked = 'translateX(0px) translateY(120px) rotate(0deg) scale(.94)';

        // Longhand chứ không dùng shorthand `transition`: trộn hai loại trong
        // cùng style object thì React có thể bỏ mất transitionDelay, mà delay
        // chính là thứ tạo hiệu ứng trải bài lần lượt từng lá.
        const motion = gone
          ? {
              transitionProperty: 'opacity',
              transitionDuration: '.12s',
              transitionTimingFunction: 'linear',
              transitionDelay: '0ms',
            }
          : {
              transitionProperty: 'transform, opacity, filter',
              transitionDuration: '.5s, .4s, .25s',
              transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1), ease, ease',
              transitionDelay: dealing ? `${i * DEAL_STEP}ms` : '0ms',
            };

        return (
          <img
            key={i}
            className={`fan__card${live ? ' fan__card--live' : ''}`}
            src={cardBack}
            alt=""
            draggable={false}
            onPointerDown={handleDown(i)}
            onPointerEnter={() => live && setHover(i)}
            onPointerLeave={() => setHover((h) => (h === i ? null : h))}
            style={{
              transform: dealt ? resting : stacked,
              opacity: gone ? 0 : dealt ? 1 : 0,
              ...motion,
              pointerEvents: live ? 'auto' : 'none',
              cursor: live ? 'grab' : 'default',
              zIndex: lifted ? FAN_N + 10 : i,
            }}
          />
        );
      })}
    </div>
  );
}

export { FAN_N };
