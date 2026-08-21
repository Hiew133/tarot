export default function AboutScreen({ readerName }) {
  return (
    <div className="shell page">
      <div className="about">
        <div className="about__avatar">ảnh reader</div>

        <div>
          <div className="eyebrow">Tarot reader · 6 năm</div>
          <h1 className="h2" style={{ marginTop: 12 }}>{readerName}</h1>

          <p className="about__pull">
            Mình đọc bài như một buổi trò chuyện. Bạn kể chuyện của bạn, lá bài
            chỉ giúp gọi tên thứ bạn đã biết.
          </p>
          <hr className="rule" />
          <p className="about__note">
            Không xem hạn, không phán chuyện sinh tử, không hù dọa. Nếu bạn đang
            gặp chuyện nặng về tâm lý, mình sẽ khuyên bạn tìm người có chuyên môn
            thay vì tìm lá bài.
          </p>

          <div className="about__offers">
            <div className="offer">
              <div className="offer__name">Đặt lịch đọc 1-1</div>
              <div className="offer__meta">45 phút</div>
            </div>
            <div className="offer">
              <div className="offer__name">Hỏi nhanh một lá</div>
              <div className="offer__meta">miễn phí</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
