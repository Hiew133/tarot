import { describe, expect, it } from 'vitest';
import { DECK } from '../data/deck.js';
import { placeAt, shuffleDeck } from './deal.js';

describe('shuffleDeck', () => {
  it('trả về đúng một hoán vị của cả bộ, không thiếu không trùng', () => {
    for (let lan = 0; lan < 50; lan++) {
      const order = shuffleDeck();
      expect(order).toHaveLength(DECK.length);
      expect([...order].sort((a, b) => a - b)).toEqual(DECK.map((_, i) => i));
    }
  });

  it('không xào ra cùng một thứ tự mãi', () => {
    const dau = shuffleDeck().join(',');
    const khac = Array.from({ length: 20 }, () => shuffleDeck().join(','));
    expect(khac.some((o) => o !== dau)).toBe(true);
  });
});

describe('placeAt', () => {
  const order = [7, 3, 11, 5];

  it('lấy lá theo số ô đã lấp, không theo vị trí ô', () => {
    // Đặt vào ô cuối trước: vẫn phải là lá đầu tiên trên chồng.
    const sau = placeAt([null, null, null], 2, order);
    expect(sau).toEqual([null, null, 7]);
    // Lá kế tiếp là lá thứ hai, dù đặt vào ô đầu.
    expect(placeAt(sau, 0, order)).toEqual([3, null, 7]);
  });

  it('không đụng vào ô đã có lá', () => {
    const ban = [7, null, null];
    expect(placeAt(ban, 0, order)).toBe(ban);
  });

  it('bỏ qua ô ngoài phạm vi', () => {
    const ban = [null, null];
    expect(placeAt(ban, -1, order)).toBe(ban);
    expect(placeAt(ban, 2, order)).toBe(ban);
  });

  it('hết bài trên chồng thì thôi', () => {
    const ban = [9, 9, null];
    expect(placeAt(ban, 2, [1, 2])).toBe(ban);
  });

  it('không sửa bàn cũ tại chỗ', () => {
    const ban = [null, null];
    const sau = placeAt(ban, 0, order);
    expect(ban).toEqual([null, null]);
    expect(sau).not.toBe(ban);
  });
});
