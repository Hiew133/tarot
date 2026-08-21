const NAV = [
  { key: 'spreads', label: 'Trải bài' },
  { key: 'history', label: 'Nhật ký' },
  { key: 'about', label: 'Về reader' },
];

export default function SiteHeader({ current, onGo }) {
  return (
    <header className="header">
      <div className="shell header__inner">
        <button type="button" className="brand" onClick={() => onGo('home')}>
          <img src="/assets/logo.svg" alt="" />
          <span>
            <span className="brand__name">Tarot</span>
            <span className="brand__tag">Ngồi xuống, rút một lá</span>
          </span>
        </button>

        <nav className="nav">
          {NAV.map((item) => (
            <button
              key={item.key}
              type="button"
              className="nav__item"
              aria-current={current === item.key ? 'page' : undefined}
              onClick={() => onGo(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
