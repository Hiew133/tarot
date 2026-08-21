import { DECK } from '../data/deck.js';

/**
 * Xào bài (Fisher–Yates) — trả về thứ tự chỉ số lá cho cả lượt trải.
 *
 * Xào một lần lúc bấm "Xào bài", rồi mỗi lần rút chỉ lấy lá kế tiếp trên chồng.
 * Nhờ vậy không bao giờ trùng lá và việc rút không phụ thuộc vào ngẫu nhiên
 * giữa chừng.
 */
export function shuffleDeck() {
  const order = DECK.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}
