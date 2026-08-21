import { useEffect, useState } from 'react';

export default function HistoryScreen({ history, onStart, onClear }) {
  // Xoá là không lấy lại được, nên hỏi lại một nhịp — nhưng bằng chính cái nút
  // đó chứ không phải hộp thoại confirm() của trình duyệt.
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) return undefined;
    const t = setTimeout(() => setConfirming(false), 5000);
    return () => clearTimeout(t);
  }, [confirming]);

  return (
    <div className="shell page">
      <div className="log__head">
        <div>
          <div className="eyebrow">Riêng tư</div>
          <h1 className="h2" style={{ marginTop: 14 }}>Nhật ký</h1>
          <p className="lede">
            {history.length
              ? 'Lưu trên máy bạn, không gửi đi đâu cả.'
              : 'Chưa có lượt trải nào ở đây.'}
          </p>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            className={`btn btn--ghost${confirming ? ' btn--danger' : ''}`}
            onClick={() => {
              if (!confirming) {
                setConfirming(true);
                return;
              }
              setConfirming(false);
              onClear();
            }}
          >
            {confirming ? `Xoá hẳn ${history.length} lượt?` : 'Xoá nhật ký'}
          </button>
        )}
      </div>

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
