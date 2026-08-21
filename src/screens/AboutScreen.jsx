import { READER } from '../data/reader.js';

/** "Linh Đan" → "LĐ". Chữ đầu của hai từ cuối, hợp với cách gọi tên tiếng Việt. */
function monogram(name) {
  const tu = name.trim().split(/\s+/);
  return tu.slice(-2).map((t) => t[0]).join('').toUpperCase();
}

export default function AboutScreen() {
  return (
    <div className="shell page">
      <div className="about">
        {/* Không có ảnh thật thì dựng một dấu hiệu tử tế, đừng bày ô xám ghi
            "ảnh reader" — người dùng đọc được chữ đó. */}
        <div className="about__avatar" aria-hidden="true">
          <span className="about__mono">{monogram(READER.name)}</span>
        </div>

        <div>
          <div className="eyebrow">{READER.role} · {READER.years} năm</div>
          <h1 className="h2" style={{ marginTop: 12 }}>{READER.name}</h1>

          <p className="about__pull">{READER.pull}</p>
          <hr className="rule" />
          <p className="about__note">{READER.note}</p>

          <div className="about__offers">
            {READER.offers.map((offer) => (
              <div className="offer" key={offer.name}>
                <div className="offer__name">{offer.name}</div>
                <div className="offer__meta">{offer.meta}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
