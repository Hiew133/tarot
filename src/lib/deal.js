import { DECK } from '../data/deck.js';

// Xác suất một lá nằm ngược. Bộ bài xào tay thật thì tỉ lệ này tuỳ thói quen
// người xào; 0.5 là mô hình "có đảo chiều khi xào", đổi số ở đây là đổi cả app.
const REVERSE_CHANCE = 0.5;

/**
 * Xào bài (Fisher–Yates) — trả về cả lượt trải dưới dạng mảng lá đã rút sẵn.
 *
 * Mỗi phần tử là `{ i, rev }`: `i` là chỉ số trong DECK, `rev` là lá có nằm
 * ngược hay không. Chiều được quyết ngay lúc xào chứ không phải lúc đặt xuống,
 * đúng như bài thật: lật lên thì nó đã sẵn chiều đó rồi.
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
  return order.map((i) => ({ i, rev: Math.random() < REVERSE_CHANCE }));
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

/** Lá trong DECK cùng phần nghĩa đúng chiều, cho một ô đã có bài. */
export function readDraw(draw) {
  const card = DECK[draw.i];
  return {
    card,
    rev: draw.rev,
    short: draw.rev ? card.rev.short : card.short,
    long: draw.rev ? card.rev.long : card.long,
  };
}

/** Tên lá kèm chiều, dùng cho nhật ký và aria-label. */
export function drawName(draw) {
  return draw.rev ? `${DECK[draw.i].name} (ngược)` : DECK[draw.i].name;
}

export { REVERSE_CHANCE };
