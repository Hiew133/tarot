import { describe, expect, it } from 'vitest';
import { DECK } from '../data/deck.js';
import { drawName, placeAt, readDraw, shuffleDeck } from './deal.js';

describe('shuffleDeck', () => {
  it('trả về đúng một hoán vị của cả bộ, không thiếu không trùng', () => {
    for (let lan = 0; lan < 50; lan++) {
      const order = shuffleDeck();
      expect(order).toHaveLength(DECK.length);
      const chiSo = order.map((d) => d.i).sort((a, b) => a - b);
      expect(chiSo).toEqual(DECK.map((_, i) => i));
    }
  });

  it('mỗi lá đều có chiều, và chiều là boolean', () => {
    for (const d of shuffleDeck()) expect(typeof d.rev).toBe('boolean');
  });

  it('có cả lá xuôi lẫn lá ngược qua nhiều lượt xào', () => {
    const chieu = new Set();
    for (let lan = 0; lan < 30; lan++) for (const d of shuffleDeck()) chieu.add(d.rev);
    expect(chieu).toEqual(new Set([true, false]));
  });

  it('không xào ra cùng một thứ tự mãi', () => {
    const dau = shuffleDeck().map((d) => d.i).join(',');
    const khac = Array.from({ length: 20 }, () => shuffleDeck().map((d) => d.i).join(','));
    expect(khac.some((o) => o !== dau)).toBe(true);
  });
});

describe('placeAt', () => {
  const order = [
    { i: 7, rev: false },
    { i: 3, rev: true },
    { i: 11, rev: false },
    { i: 5, rev: true },
  ];

  it('lấy lá theo số ô đã lấp, không theo vị trí ô', () => {
    // Đặt vào ô cuối trước: vẫn phải là lá đầu tiên trên chồng.
    const sau = placeAt([null, null, null], 2, order);
    expect(sau).toEqual([null, null, order[0]]);
    // Lá kế tiếp là lá thứ hai, dù đặt vào ô đầu.
    expect(placeAt(sau, 0, order)).toEqual([order[1], null, order[0]]);
  });

  it('giữ nguyên chiều của lá lúc xào', () => {
    const sau = placeAt([null, null], 0, order);
    expect(sau[0].rev).toBe(order[0].rev);
  });

  it('không đụng vào ô đã có lá', () => {
    const ban = [order[0], null, null];
    expect(placeAt(ban, 0, order)).toBe(ban);
  });

  it('bỏ qua ô ngoài phạm vi', () => {
    const ban = [null, null];
    expect(placeAt(ban, -1, order)).toBe(ban);
    expect(placeAt(ban, 2, order)).toBe(ban);
  });

  it('hết bài trên chồng thì thôi', () => {
    const ban = [order[0], order[1], null];
    expect(placeAt(ban, 2, order.slice(0, 2))).toBe(ban);
  });

  it('không sửa bàn cũ tại chỗ', () => {
    const ban = [null, null];
    const sau = placeAt(ban, 0, order);
    expect(ban).toEqual([null, null]);
    expect(sau).not.toBe(ban);
  });
});

describe('readDraw', () => {
  it('lá xuôi lấy nghĩa xuôi', () => {
    const d = readDraw({ i: 0, rev: false });
    expect(d.rev).toBe(false);
    expect(d.short).toBe(DECK[0].short);
    expect(d.long).toBe(DECK[0].long);
  });

  it('lá ngược lấy nghĩa ngược, không phải nghĩa xuôi', () => {
    const d = readDraw({ i: 0, rev: true });
    expect(d.rev).toBe(true);
    expect(d.short).toBe(DECK[0].rev.short);
    expect(d.long).toBe(DECK[0].rev.long);
    expect(d.long).not.toBe(DECK[0].long);
  });

  it('lá nào cũng đọc được cả hai chiều', () => {
    DECK.forEach((_, i) => {
      for (const rev of [true, false]) {
        const d = readDraw({ i, rev });
        expect(d.short.length).toBeGreaterThan(10);
        expect(d.long.length).toBeGreaterThan(40);
      }
    });
  });
});

describe('drawName', () => {
  it('ghi rõ chiều ngược, và không ghi gì khi xuôi', () => {
    expect(drawName({ i: 0, rev: false })).toBe(DECK[0].name);
    expect(drawName({ i: 0, rev: true })).toBe(`${DECK[0].name} (ngược)`);
  });
});

describe('dữ liệu bộ bài', () => {
  it('đủ 22 lá, lá nào cũng đủ trường', () => {
    expect(DECK).toHaveLength(22);
    for (const c of DECK) {
      for (const f of ['num', 'name', 'key', 'short', 'long', 'imagery', 'ask']) {
        expect(typeof c[f], `${c.name}.${f}`).toBe('string');
        expect(c[f].length, `${c.name}.${f}`).toBeGreaterThan(0);
      }
      expect(Array.isArray(c.keywords), `${c.name}.keywords`).toBe(true);
      expect(c.keywords.length).toBeGreaterThan(0);
      expect(typeof c.rev.short).toBe('string');
      expect(typeof c.rev.long).toBe('string');
    }
  });

  it('tên lá không trùng nhau', () => {
    expect(new Set(DECK.map((c) => c.name)).size).toBe(22);
  });
});
