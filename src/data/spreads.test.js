import { describe, expect, it } from 'vitest';
import { SPREADS, SPREAD_KEYS } from './spreads.js';
import { DECK } from './deck.js';

describe('SPREADS', () => {
  it('kiểu trải nào cũng có tên, mô tả và ít nhất một vị trí', () => {
    for (const key of SPREAD_KEYS) {
      const sp = SPREADS[key];
      expect(sp.name.length, key).toBeGreaterThan(0);
      expect(sp.desc.length, key).toBeGreaterThan(0);
      expect(sp.pos.length, key).toBeGreaterThan(0);
    }
  });

  it('vị trí nào cũng có nhãn và câu hỏi của riêng nó', () => {
    for (const key of SPREAD_KEYS) {
      for (const p of SPREADS[key].pos) {
        expect(typeof p.name, key).toBe('string');
        expect(p.name.length).toBeGreaterThan(0);
        expect(typeof p.lens, `${key}/${p.name}`).toBe('string');
        expect(p.lens.length).toBeGreaterThan(10);
      }
    }
  });

  it('không kiểu trải nào đòi nhiều lá hơn bộ bài có', () => {
    for (const key of SPREAD_KEYS) {
      expect(SPREADS[key].pos.length, key).toBeLessThanOrEqual(DECK.length);
    }
  });

  it('trong một kiểu trải, tên vị trí không trùng nhau', () => {
    for (const key of SPREAD_KEYS) {
      const ten = SPREADS[key].pos.map((p) => p.name);
      expect(new Set(ten).size, key).toBe(ten.length);
    }
  });
});
