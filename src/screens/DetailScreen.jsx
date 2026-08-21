import { cardArt } from '../lib/cardArt.js';
import { drawName, readDraw } from '../lib/deal.js';

/**
 * Đọc kỹ một lá.
 *
 * Bày mở sẵn theo mục thay vì giấu sau nút bấm: người đã lật bài lên thì đang
 * muốn đọc, bắt bấm thêm một cú nữa chỉ tổ vướng.
 *
 * Vị trí không chỉ là cái nhãn — nó đặt câu hỏi (`lens`), còn lá trả lời. Đó là
 * lý do cùng một lá đọc ở "Quá khứ" và ở "Nên tránh" lại ra hai chuyện khác nhau.
 */
export default function DetailScreen({
  positions,
  board,
  open,
  detailIndex,
  onBack,
  onSelect,
}) {
  const draw = detailIndex >= 0 ? board[detailIndex] : null;
  const drawn = draw ? readDraw(draw) : null;
  const position = positions[detailIndex];
  const others = open.filter((i) => i !== detailIndex);

  const back = (
    <button type="button" className="back" onClick={onBack}>
      ← Về bàn bài
    </button>
  );

  // Chưa lật lá nào thì nói thẳng là chưa có gì, đừng hiện đại lá đầu bộ.
  if (!drawn) {
    return (
      <div className="shell page">
        {back}
        <div className="empty">
          <p style={{ margin: 0 }}>Chưa có lá nào để đọc. Lật một lá trên bàn đã.</p>
        </div>
      </div>
    );
  }

  const { card, rev } = drawn;

  return (
    <div className="shell page">
      {back}

      <div className="detail">
        <div className="detail__side">
          <div className="detail__art">
            <img
              className={rev ? 'detail__img--rev' : undefined}
              src={cardArt(draw.i)}
              alt={`Lá ${card.name}${rev ? ', nằm ngược' : ''}`}
              width="500"
              height="839"
            />
          </div>
          {rev && <div className="detail__revtag">Lá nằm ngược</div>}
          {card.keywords?.length > 0 && (
            <ul className="chips">
              {card.keywords.map((k) => (
                <li className="chip" key={k}>{k}</li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <div className="detail__pos">{position?.name || ''}</div>
          <h1 className="detail__name">{card.name}</h1>
          <div className="detail__num">
            {card.num} · {card.key}
          </div>

          {position?.lens && (
            <p className="detail__lens">
              <span>Ô này hỏi:</span> {position.lens}
            </p>
          )}

          <p className="detail__short">{drawn.short}</p>
          <hr className="rule" />
          <p className="detail__long">{drawn.long}</p>

          <div className="section-label">
            {rev ? 'Nếu lá này nằm xuôi' : 'Nếu lá này nằm ngược'}
          </div>
          <p className="detail__flip">{rev ? card.long : card.rev.long}</p>

          <div className="section-label">Trong tranh</div>
          <p className="detail__imagery">{card.imagery}</p>

          <div className="section-label">Tự hỏi mình</div>
          <p className="detail__ask">{card.ask}</p>

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
                    {positions[i].name} · {drawName(board[i])}
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
