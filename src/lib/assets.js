/**
 * Đường dẫn tới file trong `public/`.
 *
 * Vite chỉ viết lại đường dẫn nó nhìn thấy lúc build (trong index.html, trong
 * import). Những chuỗi dựng lúc chạy — ảnh lá bài, mặt lưng, logo — thì nó
 * không đụng tới, nên phải tự ghép `BASE_URL` vào. Không có bước này thì bản
 * deploy ở đường dẫn con (GitHub Pages: /tarot/) sẽ mất sạch ảnh.
 *
 * `BASE_URL` của Vite luôn kết thúc bằng dấu gạch chéo.
 */
export function asset(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
