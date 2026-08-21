import { useCardBack } from '../lib/cardBack.jsx';
import { DECK } from '../data/deck.js';
import { SPREAD_KEYS } from '../data/spreads.js';

export default function HomeScreen({ onStart, onHistory }) {
  const cardBack = useCardBack();

  return (
    <div className="shell hero">
      <div>
        <div className="eyebrow">Tarot · {DECK.length} lá ẩn chính</div>
        <h1 className="h1">
          Ngồi xuống,<br />rút một lá.
        </h1>
        <p className="lede">
          Không phán quyết, không bói toán cao siêu. Chỉ là một cách để nhìn lại
          chuyện đang xảy ra với mình — chậm lại một chút, rồi tự trả lời.
        </p>

        <div className="btn-row">
          <button type="button" className="btn btn--gold" onClick={onStart}>
            Bắt đầu trải bài
          </button>
          <button type="button" className="btn btn--ghost" onClick={onHistory}>
            Xem nhật ký
          </button>
        </div>

        <div className="stats">
          <div>
            <div className="stat__n">{SPREAD_KEYS.length}</div>
            <div className="stat__l">Kiểu trải</div>
          </div>
          <div>
            <div className="stat__n">{DECK.length}</div>
            <div className="stat__l">Lá bài</div>
          </div>
          <div>
            <div className="stat__n">0đ</div>
            <div className="stat__l">Lưu trên máy bạn</div>
          </div>
        </div>
      </div>

      <div className="hero__art" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <img key={i} className="hero__card" src={cardBack} alt="" />
        ))}
      </div>
    </div>
  );
}
