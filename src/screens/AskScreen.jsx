export default function AskScreen({
  spreadName,
  question,
  onQuestion,
  onBack,
  onShuffle,
  onSkip,
}) {
  return (
    <div className="shell page">
      <div className="ask">
        <button type="button" className="back" onClick={onBack}>
          ← Đổi kiểu trải
        </button>
        <div className="eyebrow">Bước 2 · {spreadName}</div>
        <h1 className="h2" style={{ marginTop: 14 }}>Bạn đang thắc mắc điều gì?</h1>
        <p className="lede">Viết ra cho rõ. Không ai đọc ngoài bạn — câu hỏi chỉ nằm trên máy này.</p>

        <div className="panel ask__panel">
          <label className="eyebrow" htmlFor="cauhoi" style={{ color: 'var(--ink-faint)' }}>
            Câu hỏi
          </label>
          <textarea
            id="cauhoi"
            className="ask__field"
            value={question}
            onChange={(e) => onQuestion(e.target.value)}
            placeholder="Ví dụ: mình có nên nhận công việc mới không?"
          />
          <div className="ask__foot">
            <button type="button" className="btn btn--rust" onClick={onShuffle}>
              Xào bài
            </button>
            <button type="button" className="btn--quiet" onClick={onSkip}>
              Bỏ qua, rút luôn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
