import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useCardBack } from '../lib/cardBack.jsx';

const FAN_N = 30;            // số lá bày ra quạt
const MAX_ANGLE = 33;        // độ nghiêng của lá ngoài cùng
const ARC_DEPTH = 58;        // độ võng của vòng cung (px)
const HOVER_LIFT = 34;       // lá nhô lên khi rê chuột (px)
const DEAL_STEP = 26;        // độ trễ trải từng lá (ms)
const DEAL_SETTLE = 700;
// Chỗ phải chừa ở hai mép quạt cho lá ngoài cùng.
//
// Không phải nửa bề ngang lá: lá nghiêng MAX_ANGLE quanh gốc 50% 92%, tức quay
// quanh một điểm gần chân lá, nên góc trên của nó văng ra xa hơn nhiều. Với lá
// 78 × 126 nghiêng 33°, góc xa nhất cách gốc khoảng 96px.
//
// Chừa thiếu thì hai lá rìa thò khỏi khung và đẻ ra thanh cuộn ngang — mà thanh
// đó lại ăn mất chiều cao, làm trang cuộn dọc theo và quạt bài tụt khỏi màn hình.
const EDGE_ROOM = 100;

/**
 * Quạt bài trải ngang đáy bàn.
 *
 * Vị trí từng lá tính thẳng từ vị trí tương đối u ∈ [-1, 1]: lệch ngang theo u,
 * võng xuống theo u² và nghiêng theo u. Nhờ vậy bề rộng quạt co giãn theo khung
 * mà hình dáng vòng cung vẫn giữ nguyên.
 *
 * Quạt chỉ lo phần bày bài và báo ra "vừa bốc lá nào" — chuyện lá đi đâu sau đó
 * do bàn bài (DrawScreen) cầm, vì chỉ nó mới biết các ô.
 *
 * Bàn phím: cả quạt chỉ chiếm **một** điểm dừng Tab (roving tabindex), rồi mũi
 * tên trái/phải chạy dọc quạt, Enter hoặc Space rút lá đang chọn. Ba mươi nút
 * cùng nằm trong chuỗi Tab thì đúng chuẩn nhưng dùng thì khổ.
 */
export default function CardFan({ taken, grabbed, disabled, onPickUp, onQuickPick }) {
  const cardBack = useCardBack();
  const [hover, setHover] = useState(null);
  const [dealt, setDealt] = useState(false);
  const [dealing, setDealing] = useState(true);
  const [spreadX, setSpreadX] = useState(360);
  const [focusIndex, setFocusIndex] = useState(0);
  const rootRef = useRef(null);
  const cardsRef = useRef([]);

  const canTake = (i) => !disabled && !taken.has(i) && grabbed !== i;

  // Quạt rộng theo khung, nhưng không rộng quá thành lưa thưa.
  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const measure = () =>
      setSpreadX(Math.min(el.clientWidth * 0.44, el.clientWidth / 2 - EDGE_ROOM, 430));
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

  // Chỗ dừng Tab của cả quạt. Tính ra chứ không giữ trong state: lá đang giữ
  // chỗ có thể vừa bị rút mất, và khi đó chỗ dừng phải nhảy sang lá còn lại
  // ngay trong cùng một lần render.
  let tabStop = canTake(focusIndex) ? focusIndex : -1;
  if (tabStop < 0) {
    for (let i = 0; i < FAN_N; i++) {
      if (canTake(i)) {
        tabStop = i;
        break;
      }
    }
  }

  const geometry = (i) => {
    const half = (FAN_N - 1) / 2;
    const u = (i - half) / half;
    return { x: u * spreadX, y: u * u * ARC_DEPTH, angle: u * MAX_ANGLE };
  };

  const moveFocus = (from, step) => {
    for (let i = from + step; i >= 0 && i < FAN_N; i += step) {
      if (!canTake(i)) continue;
      setFocusIndex(i);
      cardsRef.current[i]?.focus();
      return;
    }
  };

  const handleDown = (i) => (e) => {
    if (!canTake(i) || grabbed != null) return;
    e.preventDefault();
    const box = e.currentTarget.getBoundingClientRect();
    setFocusIndex(i);
    onPickUp(i, {
      x: e.clientX,
      y: e.clientY,
      // Lệch giữa con trỏ và tâm lá, để lá không nhảy giật vào con trỏ.
      offsetX: box.left + box.width / 2 - e.clientX,
      offsetY: box.top + box.height / 2 - e.clientY,
      rotate: geometry(i).angle,
    });
  };

  const handleKey = (i) => (e) => {
    const step =
      e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1
      : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1
      : 0;

    if (step) {
      e.preventDefault();
      moveFocus(i, step);
      return;
    }
    if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      moveFocus(e.key === 'Home' ? -1 : FAN_N, e.key === 'Home' ? 1 : -1);
      return;
    }
    if (e.key !== 'Enter' && e.key !== ' ') return;

    // Chặn click tổng hợp của <button>: bàn phím đi lối rút nhanh riêng, lá tự
    // bốc lên giữa bàn rồi về ô trống đầu tiên — kéo thả thì không làm được.
    e.preventDefault();
    if (!canTake(i) || grabbed != null) return;
    const box = e.currentTarget.getBoundingClientRect();
    onQuickPick(i, {
      cx: box.left + box.width / 2,
      cy: box.top + box.height / 2,
      rotate: geometry(i).angle,
    });
  };

  return (
    <div
      className="fan"
      ref={rootRef}
      role="group"
      aria-label="Quạt bài úp — mũi tên trái/phải để chọn lá, Enter để rút"
    >
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
          <button
            key={i}
            type="button"
            ref={(el) => { cardsRef.current[i] = el; }}
            className={`fan__card${live ? ' fan__card--live' : ''}`}
            aria-label={`Lá úp thứ ${i + 1}`}
            tabIndex={i === tabStop ? 0 : -1}
            disabled={!live}
            onPointerDown={handleDown(i)}
            onKeyDown={handleKey(i)}
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
          >
            <img src={cardBack} alt="" draggable={false} />
          </button>
        );
      })}
    </div>
  );
}

export { FAN_N };
