import { SPREADS, SPREAD_KEYS } from '../data/spreads.js';

export default function SpreadsScreen({ onChoose }) {
  return (
    <div className="shell page">
      <div className="eyebrow">Bước 1</div>
      <h1 className="h2" style={{ marginTop: 14 }}>Chọn kiểu trải</h1>
      <p className="lede">Câu hỏi càng cụ thể, lá bài càng dễ nói.</p>

      <div className="grid-spreads">
        {SPREAD_KEYS.map((key) => {
          const sp = SPREADS[key];
          return (
            <button
              key={key}
              type="button"
              className="spread"
              aria-label={`${sp.name} — ${sp.pos.length} lá. ${sp.desc}`}
              onClick={() => onChoose(key)}
            >
              <span className="spread__count">{sp.pos.length}</span>
              <span className="spread__name">{sp.name}</span>
              <span className="spread__desc">{sp.desc}</span>
              <span className="spread__go">Chọn →</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
