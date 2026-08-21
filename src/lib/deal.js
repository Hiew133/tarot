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

/**
 * Bàn bài sau khi đặt lá kế tiếp trên chồng vào ô `position`.
 *
 * Ô ngoài phạm vi, ô đã có lá, hoặc chồng đã hết bài thì trả về đúng bàn cũ —
 * người gọi so sánh tham chiếu là biết có đặt được hay không.
 *
 * Lá lấy theo **số ô đã lấp** chứ không theo `position`: người chơi được chọn
 * đặt vào ô nào tuỳ ý, còn thứ tự lấy lá thì vẫn là thứ tự trên chồng.
 */
export function placeAt(board, position, order) {
  if (position < 0 || position >= board.length || board[position] !== null) return board;
  const count = board.reduce((n, v) => (v === null ? n : n + 1), 0);
  if (count >= order.length) return board;
  const next = [...board];
  next[position] = order[count];
  return next;
}
