import { useCardBack } from '../lib/cardBack.jsx';

/**
 * Lá bài đang cầm trên tay: bám theo con trỏ cho tới khi thả.
 *
 * Vừa nhấc lên là lá thẳng người lại và to hẳn ra, nghiêng nhẹ theo hướng kéo
 * cho có sức nặng. Khi đang chờm lên một ô trống thì lá ngay ngắn hẳn và sáng
 * viền — dấu hiệu thả xuống là đặt được.
 */
export default function HeldCard({ x, y, tilt, overSlot }) {
  const cardBack = useCardBack();

  return (
    <img
      className={`held-card${overSlot ? ' held-card--ready' : ''}`}
      src={cardBack}
      alt=""
      draggable={false}
      style={{
        left: x,
        top: y,
        transform:
          `translate(-50%, -50%) rotate(${overSlot ? 0 : tilt}deg) ` +
          `scale(${overSlot ? 1.75 : 1.95})`,
      }}
    />
  );
}
