/**
 * Ảnh mặt lá bài — bản scan Rider–Waite–Smith 1909 (hết hạn bản quyền),
 * tải từ Wikimedia Commons về `public/assets/cards/`. Tên file theo đúng chỉ số
 * trong DECK: 00.jpg là Kẻ Khờ, 21.jpg là Thế Giới.
 *
 * Xem `public/assets/cards/NOTICE.txt` để biết nguồn và giấy phép.
 */
export function cardArt(deckIndex) {
  return `/assets/cards/${String(deckIndex).padStart(2, '0')}.jpg`;
}
