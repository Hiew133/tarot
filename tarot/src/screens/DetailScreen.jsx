import { DECK } from '../data/deck.js';
import { cardArt } from '../lib/cardArt.js';

export default function DetailScreen({
  positions,
  board,
  open,
  detailIndex,
  onBack,
  onSelect,
}) {
  const deckIndex = board[detailIndex];
  const card = DECK[deckIndex ?? 0];
  const others = open.filter((i) => i !== detailIndex);

  return (
    <div className="shell page">
      <button type="button" className="back" onClick={onBack}>
        ← Về bàn bài
      </button>

      <div className="detail">
        <div className="detail__art">
          <img src={cardArt(deckIndex ?? 0)} alt={`Lá ${card.name}`} />
        </div>

        <div>
          <div className="detail__pos">{positions[detailIndex] || ''}</div>
          <h1 className="detail__name">{card.name}</h1>
          <div className="detail__num">
            {card.num} · {card.key}
          </div>

          <p className="detail__short">{card.short}</p>
          <hr className="rule" />
          <p className="detail__long">{card.long}</p>

          {others.length > 0 && (
            <>
              <div className="section-label">Các lá khác</div>
              <div className="pills">
                {others.map((i) => (
                  <button
                    key={i}
                    type="button"
                    className="pill"
                    onClick={() => onSelect(i)}
                  >
                    {positions[i]} · {DECK[board[i]].name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
