/**
 * Chân trang.
 *
 * Lý do chính không phải để trang trí: ảnh 22 lá là bản scan Rider–Waite–Smith
 * 1909 đã hết hạn bản quyền, mà lời ghi nguồn trước giờ chỉ nằm trong
 * `public/assets/cards/NOTICE.txt` — không ai đọc file đó. Ghi nguồn thì phải
 * ghi ở chỗ người ta nhìn thấy.
 *
 * Cố tình gọn: một dòng nguồn, một dòng riêng tư. Không dựng bốn cột link.
 */
export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <p className="footer__line">
          Ảnh lá bài lấy từ bộ <em>Rider–Waite–Smith</em> 1909 của Pamela Colman
          Smith — đã hết hạn bản quyền, tải từ{' '}
          <a
            className="footer__link"
            href="https://commons.wikimedia.org/wiki/Category:Rider-Waite_tarot_deck"
            target="_blank"
            rel="noreferrer"
          >
            Wikimedia Commons
          </a>.
        </p>
        <p className="footer__line footer__line--quiet">
          Câu hỏi và nhật ký của bạn nằm trong trình duyệt này, không gửi đi đâu.
          Xoá lúc nào cũng được ở trang Nhật ký.
        </p>
      </div>
    </footer>
  );
}
