import { DECK } from '../data/deck.js';
import { cardArt } from '../lib/cardArt.js';
import { useCardBack } from '../lib/cardBack.jsx';

/** Bàn web rộng nên lá to hẳn; bộ trải nhiều lá thì thu nhỏ lại cho vừa hàng. */
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
    <div className="slots">
      {positions.map((label, i) => {
        const deckIndex = i === landingIndex ? null : board[i];
        const has = deckIndex !== null && deckIndex !== undefined;
        const isOpen = has && open.includes(i);
        const card = has ? DECK[deckIndex] : null;

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
            style={{ width: size.width, cursor: has ? 'pointer' : 'default' }}
            disabled={!has}
            aria-label={
              !has ? `${label} — ô trống`
                : isOpen ? `${label} — ${card.name}, đọc chi tiết`
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
              style={{
                height: size.height,
                ...(state === 'down' ? { backgroundImage: `url(${cardBack})` } : null),
              }}
            >
              {isOpen && <img className="slot__art" src={cardArt(deckIndex)} alt={card.name} />}
            </div>
            <div className="slot__label">{label}</div>
            {isOpen && (
              <div className="slot__card">
                {card.num} · {card.name}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
