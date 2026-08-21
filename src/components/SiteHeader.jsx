import { asset } from '../lib/assets.js';

const NAV = [
  { key: 'spreads', label: 'Trải bài' },
  { key: 'history', label: 'Nhật ký' },
  { key: 'about', label: 'Về reader' },
];

/**
 * Thanh đầu trang.
 *
 * Khi đang dở một lượt trải, mục "Trải bài" đổi thành "Bàn bài" và đưa thẳng về
 * bàn đang mở — trước đây bấm sang Nhật ký giữa chừng là mất đường quay lại, vì
 * mục đó luôn dẫn về màn chọn kiểu trải và reset sạch bàn.
 */
export default function SiteHeader({ current, resuming, onGo }) {
  return (
    <header className="header">
      <div className="shell header__inner">
        <button type="button" className="brand" onClick={() => onGo('home')}>
          <img src={asset('assets/logo.svg')} alt="" width="34" height="34" />
          <span>
            <span className="brand__name">Tarot</span>
            <span className="brand__tag">Ngồi xuống, rút một lá</span>
          </span>
        </button>

        <nav className="nav">
          {NAV.map((item) => {
            const resume = item.key === 'spreads' && resuming;
            return (
              <button
                key={item.key}
                type="button"
                className="nav__item"
                aria-current={current === item.key ? 'page' : undefined}
                onClick={() => onGo(resume ? 'reading' : item.key)}
              >
                {resume ? 'Bàn bài' : item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
