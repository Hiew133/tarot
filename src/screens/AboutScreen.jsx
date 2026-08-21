import { READER } from '../data/reader.js';

export default function AboutScreen() {
  return (
    <div className="shell page">
      <div className="about">
        <div className="about__avatar">ảnh reader</div>

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
