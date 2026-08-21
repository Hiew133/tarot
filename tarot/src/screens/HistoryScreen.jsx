export default function HistoryScreen({ history, onStart }) {
  return (
    <div className="shell page">
      <div className="eyebrow">Riêng tư</div>
      <h1 className="h2" style={{ marginTop: 14 }}>Nhật ký</h1>
      <p className="lede">
        {history.length
          ? 'Lưu trên máy bạn, không gửi đi đâu cả.'
          : 'Chưa có lượt trải nào ở đây.'}
      </p>

      {history.length === 0 ? (
        <div className="empty">
          <p style={{ margin: 0 }}>Rút xong một bộ là nó tự lưu vào đây.</p>
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <button type="button" className="btn btn--gold" onClick={onStart}>
              Trải một bộ
            </button>
          </div>
        </div>
      ) : (
        <div className="log">
          {history.map((entry, i) => (
            <div className="log__item" key={`${entry.when}-${entry.cards}-${i}`}>
              <div className="log__top">
                <div className="log__when">{entry.when}</div>
                <div className="log__spread">{entry.spread}</div>
              </div>
              <div className="log__question">{entry.question}</div>
              <div className="log__cards">{entry.cards}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
