import { useCallback, useEffect, useRef, useState } from 'react';
import { DECK } from '../data/deck.js';
import { SPREADS } from '../data/spreads.js';
import { shuffleDeck } from './deal.js';
import { loadHistory, pushEntry, saveHistory, today } from './history.js';

const SHUFFLE_MS = 2100;  // đủ cho hơn một vòng riffle

/**
 * Một lượt trải bài: chọn kiểu trải → đặt câu hỏi → xào → bốc và đặt → lật → đọc.
 *
 * `board` là bàn bài: mỗi vị trí giữ chỉ số lá trong DECK, hoặc null khi còn
 * trống. Người chơi tự chọn đặt lá vào ô nào, nên bàn không lấp tuần tự — lá
 * lấy từ chồng đã xào theo thứ tự, còn chỗ đặt là tuỳ họ.
 */
export function useReading() {
  const [screen, setScreen] = useState('home');
  const [spreadKey, setSpreadKey] = useState('three');
  const [question, setQuestion] = useState('');
  const [phase, setPhase] = useState('ask');
  const [slots, setSlots] = useState(() => Array(SPREADS.three.pos.length).fill(null));
  const [open, setOpen] = useState([]);
  const [detail, setDetail] = useState(0);
  const [history, setHistory] = useState([]);
  const [order, setOrder] = useState(shuffleDeck);

  const shuffleTimer = useRef(null);
  const savedSignature = useRef(null);

  const spread = SPREADS[spreadKey];
  const positions = spread.pos;
  const total = positions.length;

  // Bảo hiểm cho nhịp render ngay sau khi đổi kiểu trải.
  const board = slots.length === total ? slots : Array(total).fill(null);
  const filled = board.reduce((n, v) => (v === null ? n : n + 1), 0);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  useEffect(() => () => clearTimeout(shuffleTimer.current), []);

  const go = useCallback((next) => setScreen(next), []);

  const reset = useCallback((count) => {
    savedSignature.current = null;
    setSlots(Array(count).fill(null));
    setOpen([]);
    setDetail(0);
  }, []);

  const chooseSpread = useCallback(
    (key) => {
      clearTimeout(shuffleTimer.current);
      setSpreadKey(key);
      setScreen('reading');
      setPhase('ask');
      reset(SPREADS[key].pos.length);
    },
    [reset]
  );

  const startShuffle = useCallback(() => {
    setOrder(shuffleDeck());
    reset(total);
    setPhase('shuffle');
    clearTimeout(shuffleTimer.current);
    shuffleTimer.current = setTimeout(() => setPhase('draw'), SHUFFLE_MS);
  }, [reset, total]);

  /** Đặt lá kế tiếp trên chồng vào ô `position`. Ô đã có lá thì bỏ qua. */
  const placeCard = useCallback(
    (position) => {
      setSlots((prev) => {
        if (prev.length !== total) return prev;
        if (position < 0 || position >= total || prev[position] !== null) return prev;
        const count = prev.reduce((n, v) => (v === null ? n : n + 1), 0);
        if (count >= order.length) return prev;
        const next = [...prev];
        next[position] = order[count];
        return next;
      });
    },
    [order, total]
  );

  const flip = useCallback(
    (position) => {
      if (board[position] === null) return;
      setOpen((prev) => (prev.includes(position) ? prev : [...prev, position]));
    },
    [board]
  );

  const openDetail = useCallback((position) => {
    setDetail(position);
    setScreen('detail');
  }, []);

  // Lật đủ bộ thì tự ghi vào nhật ký — mỗi bàn bài chỉ ghi một lần.
  useEffect(() => {
    if (total === 0 || open.length !== total || filled !== total) return;
    const signature = board.join(',');
    if (savedSignature.current === signature) return;
    savedSignature.current = signature;

    const entry = {
      when: today(),
      spread: spread.name,
      question: question || '(không đặt câu hỏi)',
      cards: board.map((i) => DECK[i].name).join(' · '),
    };
    setHistory((prev) => {
      const next = pushEntry(prev, entry);
      saveHistory(next);
      return next;
    });
  }, [open.length, filled, total, board, spread.name, question]);

  const allOpen = total > 0 && open.length === total;
  const lastOpen = open.length ? open[open.length - 1] : -1;

  let detailIndex = detail;
  if (board[detailIndex] == null) {
    detailIndex = open.length ? open[0] : board.findIndex((v) => v !== null);
    if (detailIndex < 0) detailIndex = 0;
  }

  return {
    screen,
    phase,
    spreadKey,
    spread,
    positions,
    total,
    question,
    board,
    filled,
    open,
    history,
    allOpen,
    lastOpen,
    detailIndex,
    setQuestion,
    go,
    chooseSpread,
    startShuffle,
    placeCard,
    flip,
    openDetail,
    setDetail,
  };
}

export { SHUFFLE_MS };
