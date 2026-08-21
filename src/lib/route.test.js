import { beforeEach, describe, expect, it } from 'vitest';
import { initialScreen, screenFromHash } from './route.js';

const goTo = (hash) => { window.location.hash = hash; };

describe('screenFromHash', () => {
  beforeEach(() => goTo(''));

  it('nhận mọi màn hợp lệ', () => {
    for (const man of ['home', 'spreads', 'reading', 'detail', 'history', 'about']) {
      goTo(man);
      expect(screenFromHash()).toBe(man);
    }
  });

  it('hash lạ thì về trang chủ', () => {
    goTo('bậy bạ');
    expect(screenFromHash()).toBe('home');
  });
});

describe('initialScreen', () => {
  beforeEach(() => goTo(''));

  it('mở lại được những màn không cần state lượt trải', () => {
    for (const man of ['spreads', 'history', 'about']) {
      goTo(man);
      expect(initialScreen()).toBe(man);
    }
  });

  it('vào thẳng bàn bài từ tab mới thì về trang chủ, vì bàn bài không nằm trong URL', () => {
    goTo('reading');
    expect(initialScreen()).toBe('home');
    goTo('detail');
    expect(initialScreen()).toBe('home');
  });
});
