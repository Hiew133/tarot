/**
 * Địa chỉ trang, gọn nhất có thể.
 *
 * App không dùng router — điều hướng là state. Nhưng nếu không có gì trên URL
 * thì nút Back của trình duyệt là thoát app, và tải lại trang là về màn chủ.
 * Nên mỗi màn được gắn một hash.
 *
 * Một lượt trải thì **không** nằm trong URL: bàn bài, câu hỏi và thứ tự xào chỉ
 * sống trong bộ nhớ. Vào thẳng `#reading` từ tab mới không khôi phục được gì,
 * nên những màn đó không nằm trong danh sách mở lại được.
 */
const SCREENS = ['home', 'spreads', 'reading', 'detail', 'history', 'about'];
const RESTORABLE = ['home', 'spreads', 'history', 'about'];

function currentHash() {
  if (typeof window === 'undefined') return '';
  return window.location.hash.replace(/^#/, '');
}

/** Màn hình đọc từ hash, đã lọc qua danh sách hợp lệ. */
export function screenFromHash() {
  const hash = currentHash();
  return SCREENS.includes(hash) ? hash : 'home';
}

/** Màn hình lúc mới mở trang — chỉ nhận những màn không cần state lượt trải. */
export function initialScreen() {
  const hash = currentHash();
  return RESTORABLE.includes(hash) ? hash : 'home';
}

let synced = false;

/**
 * Đẩy màn hình hiện tại lên thanh địa chỉ.
 *
 * Lần đồng bộ đầu tiên dùng `replaceState` để không chèn thêm một mục vào
 * history — nếu không, cú Back đầu tiên chỉ đưa người dùng về đúng chỗ họ đang
 * đứng và trông như nút Back bị hỏng.
 */
export function syncHash(screen) {
  if (typeof window === 'undefined') return;
  const want = `#${screen}`;
  if (window.location.hash !== want) {
    if (synced) window.history.pushState(null, '', want);
    else window.history.replaceState(null, '', want);
  }
  synced = true;
}
