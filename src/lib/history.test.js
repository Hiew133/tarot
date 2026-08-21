import { beforeEach, describe, expect, it } from 'vitest';
import { clearHistory, loadHistory, pushEntry, saveHistory, today } from './history.js';

const entry = (n) => ({ when: '21/08/2026', spread: 'Ba lá', question: String(n), cards: 'A' });

describe('pushEntry', () => {
  it('đặt lượt mới lên đầu', () => {
    const sau = pushEntry([entry(1)], entry(2));
    expect(sau.map((e) => e.question)).toEqual(['2', '1']);
  });

  it('giữ tối đa 20 lượt, cắt từ cuối', () => {
    let log = [];
    for (let i = 0; i < 25; i++) log = pushEntry(log, entry(i));
    expect(log).toHaveLength(20);
    expect(log[0].question).toBe('24');
    expect(log[19].question).toBe('5');
  });

  it('không sửa mảng cũ tại chỗ', () => {
    const cu = [entry(1)];
    pushEntry(cu, entry(2));
    expect(cu).toHaveLength(1);
  });
});

describe('loadHistory', () => {
  beforeEach(() => localStorage.clear());

  it('chưa có gì thì trả mảng rỗng', () => {
    expect(loadHistory()).toEqual([]);
  });

  it('đi qua được localStorage hỏng', () => {
    localStorage.setItem('tarot-nhatky', '{không phải json');
    expect(loadHistory()).toEqual([]);
  });

  it('dữ liệu đúng kiểu nhưng không phải mảng cũng không làm vỡ', () => {
    localStorage.setItem('tarot-nhatky', '{"a":1}');
    expect(loadHistory()).toEqual([]);
  });

  it('đọc lại được thứ vừa ghi', () => {
    saveHistory([entry(1)]);
    expect(loadHistory()).toHaveLength(1);
  });
});

describe('clearHistory', () => {
  it('xoá sạch khỏi máy', () => {
    saveHistory([entry(1)]);
    clearHistory();
    expect(localStorage.getItem('tarot-nhatky')).toBeNull();
    expect(loadHistory()).toEqual([]);
  });
});

describe('today', () => {
  it('ra dạng ngày/tháng/năm kiểu Việt', () => {
    expect(today()).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  });
});
