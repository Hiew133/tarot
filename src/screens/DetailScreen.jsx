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
  const deckIndex = detailIndex >= 0 ? board[detailIndex] : null;
  const card = deckIndex == null ? null : DECK[deckIndex];
  const others = open.filter((i) => i !== detailIndex);

  const back = (
    <button type="button" className="back" onClick={onBack}>
      ← Về bàn bài
    </button>
  );

  // Chưa lật lá nào thì nói thẳng là chưa có gì, đừng hiện đại lá đầu bộ.
  if (!card) {
    return (
      <div className="shell page">
        {back}
        <div className="empty">
          <p style={{ margin: 0 }}>Chưa có lá nào để đọc. Lật một lá trên bàn đã.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="shell page">
      {back}

      <div className="detail">
        <div className="detail__art">
          <img src={cardArt(deckIndex)} alt={`Lá ${card.name}`} width="500" height="839" />
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
