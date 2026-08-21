import { cardArt } from '../lib/cardArt.js';
import { readDraw } from '../lib/deal.js';
import { useCardBack } from '../lib/cardBack.jsx';

/**
 * Bàn web rộng nên lá to hẳn; bộ trải nhiều lá thì thu nhỏ lại cho vừa hàng.
 *
 * Đây là kích thước **gốc**, tính theo số lá. CSS còn co thêm hai chiều nữa để
 * cả bàn bài lọt trong một màn hình: `--slot-scale` theo chiều cao cửa sổ, và
 * một mức trần theo bề ngang để `--slot-n` lá luôn đứng vừa một hàng.
 */
function cardSize(count) {
  if (count <= 3) return { width: 148, height: 236 };
  if (count <= 5) return { width: 124, height: 198 };
  return { width: 100, height: 160 };
}

/**
 * Các ô của bộ trải. Bốn trạng thái: trống, đang là chỗ thả (khi cầm bài),
 * lá úp (chạm để lật), lá ngửa (chạm để đọc chi tiết).
 *
 * `landingIndex` là ô đang có lá bay tới — ô đó giữ nguyên vẻ trống cho tới khi
 * lá đáp xuống, để lá bay và lá trong ô không hiện cùng lúc thành hai lá.
 *
 * Lá ngược thì ảnh xoay 180°, đúng như trên bàn thật, và aria-label nói rõ chiều.
 */
export default function SlotGrid({
  positions,
  board,
  open,
  landingIndex,
  dropTarget,
  armed,
  onFlip,
  onOpenDetail,
}) {
  const cardBack = useCardBack();
  const size = cardSize(positions.length);

  return (
    <div
      className="slots"
      style={{ '--slot-w': `${size.width}px`, '--slot-n': positions.length }}
    >
      {positions.map((position, i) => {
        const label = position.name;
        const draw = i === landingIndex ? null : board[i];
        const has = draw !== null && draw !== undefined;
        const isOpen = has && open.includes(i);
        const drawn = has ? readDraw(draw) : null;

        const state = !has ? 'empty' : isOpen ? 'up' : 'down';
        const classes = ['slot', `slot--${state}`];
        if (!has && armed) classes.push('slot--armed');
        if (!has && dropTarget === i) classes.push('slot--target');

        return (
          <button
            key={label + i}
            type="button"
            className={classes.join(' ')}
            data-slot={i}
            style={{ cursor: has ? 'pointer' : 'default' }}
            disabled={!has}
            aria-label={
              !has ? `${label} — ô trống`
                : isOpen
                  ? `${label} — ${drawn.card.name}${drawn.rev ? ', lá ngược' : ''}, đọc chi tiết`
                  : `${label} — lá úp, chạm để lật`
            }
            onClick={() => {
              if (!has) return;
              if (!isOpen) onFlip(i);
              else onOpenDetail(i);
            }}
          >
            <div
              className="slot__face"
              style={state === 'down' ? { backgroundImage: `url(${cardBack})` } : undefined}
            >
              {isOpen && (
                <img
                  className={`slot__art${drawn.rev ? ' slot__art--rev' : ''}`}
                  src={cardArt(draw.i)}
                  alt={drawn.card.name}
                  width="500"
                  height="839"
                />
              )}
            </div>
            <div className="slot__label">{label}</div>
            <div className="slot__card">
              {isOpen && (
                <>
                  {drawn.card.num} · {drawn.card.name}
                  {drawn.rev && <span className="slot__rev">ngược</span>}
                </>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
