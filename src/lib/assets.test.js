import { describe, expect, it } from 'vitest';
import { asset } from './assets.js';
import { cardArt } from './cardArt.js';

describe('asset', () => {
  it('ghép base vào, không đẻ ra hai dấu gạch chéo', () => {
    expect(asset('assets/logo.svg')).toBe(`${import.meta.env.BASE_URL}assets/logo.svg`);
    expect(asset('/assets/logo.svg')).toBe(`${import.meta.env.BASE_URL}assets/logo.svg`);
    expect(asset('assets/logo.svg')).not.toContain('//assets');
  });
});

describe('cardArt', () => {
  it('đệm số 0 theo đúng tên file', () => {
    expect(cardArt(0)).toContain('assets/cards/00.jpg');
    expect(cardArt(9)).toContain('assets/cards/09.jpg');
    expect(cardArt(21)).toContain('assets/cards/21.jpg');
  });

  it('đi qua base giống mọi asset khác', () => {
    expect(cardArt(3).startsWith(import.meta.env.BASE_URL)).toBe(true);
  });
});
