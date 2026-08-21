import { useEffect, useRef } from 'react';
import { FAN_CARD_W, useCardBack } from '../lib/cardBack.jsx';

const SNAP_MS = 340;   // thả tay xuống ô: chỉ cần một cái nảy gọn
const AUTO_MS = 1050;  // bấm một cái: lá tự bốc lên rồi bay sang ô

/**
 * Lá rời tay bay vào ô.
 *
 * Hai kiểu. Kéo thả xong (`stage` không có) thì lá chỉ búng gọn từ chỗ thả vào
 * ô. Còn bấm một cái để rút tự động thì lá bốc lên giữa bàn, phóng to, giữ một
 * nhịp cho kịp nhìn rồi mới hạ xuống ô.
 */
export default function FlyingCard({ from, stage, to, onDone }) {
  const cardBack = useCardBack();
  const ref = useRef(null);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const centre = 'translate(-50%, -50%)';
    const at = (p) => `translate(${p.cx - from.cx}px, ${p.cy - from.cy}px)`;
    const landed = `${centre} ${at(to)} rotate(0deg) scale(${to.w / FAN_CARD_W})`;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const frames = stage
      ? [
          { transform: `${centre} rotate(${from.rotate}deg) scale(${from.scale ?? 1})` },
          {
            transform: `${centre} ${at(stage)} rotate(0deg) scale(2.6)`,
            offset: 0.4,
            easing: 'cubic-bezier(.2,.9,.25,1)',
          },
          { transform: `${centre} ${at(stage)} rotate(0deg) scale(2.6)`, offset: 0.62 },
          { transform: landed, easing: 'cubic-bezier(.4,0,.2,1)' },
        ]
      : [
          { transform: `${centre} rotate(${from.rotate}deg) scale(${from.scale ?? 1})` },
          { transform: landed },
        ];

    const duration = reduced ? 140 : stage ? AUTO_MS : SNAP_MS;
    const animation = el.animate(frames, {
      duration,
      easing: 'cubic-bezier(.32,.72,.3,1)',
      fill: 'forwards',
    });

    animation.onfinish = () => done.current();

    // Tab bị ẩn thì đồng hồ animation đứng lại và onfinish không bao giờ chạy —
    // hẹn giờ dự phòng để lá vẫn đáp xuống ô thay vì kẹt giữa chừng.
    const fallback = setTimeout(() => done.current(), duration + 400);

    return () => {
      clearTimeout(fallback);
      animation.cancel();
    };
  }, [from, stage, to]);

  return (
    <img
      ref={ref}
      className="flying-card"
      src={cardBack}
      alt=""
      style={{ left: from.cx, top: from.cy }}
    />
  );
}
