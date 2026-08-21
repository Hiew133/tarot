import { useCallback, useEffect, useRef, useState } from 'react';
import { DECK } from '../data/deck.js';
import { SPREADS } from '../data/spreads.js';
import { shuffleDeck } from './deal.js';
import { initialScreen, screenFromHash, syncHash } from './route.js';
import { clearHistory, loadHistory, pushEntry, saveHistory, today } from './history.js';

const SHUFFLE_MS = 2100;         // đủ cho hơn một vòng riffle
const DEFAULT_SPREAD = 'three';

/**
 * Một lượt trải bài: chọn kiểu trải → đặt câu hỏi → xào → bốc và đặt → lật → đọc.
 *
 * `board` là bàn bài: mỗi vị trí giữ chỉ số lá trong DECK, hoặc null khi còn
 * trống. Người chơi tự chọn đặt lá vào ô nào, nên bàn không lấp tuần tự — lá
 * lấy từ chồng đã xào theo thứ tự, còn chỗ đặt là tuỳ họ.
 */
export function useReading() {
  const [screen, setScreen] = useState(initialScreen);
  const [spreadKey, setSpreadKey] = useState(DEFAULT_SPREAD);
  const [question, setQuestion] = useState('');
  const [phase, setPhase] = useState('ask');
  const [slots, setSlots] = useState(() => Array(SPREADS[DEFAULT_SPREAD].pos.length).fill(null));
  const [open, setOpen] = useState([]);
  const [detail, setDetail] = useState(0);
  const [history, setHistory] = useState([]);
  const [order, setOrder] = useState(shuffleDeck);
  const [active, setActive] = useState(false);

  const shuffleTimer = useRef(null);
  const savedSignature = useRef(null);
  const activeRef = useRef(false);
  activeRef.current = active;

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

  // Địa chỉ đi theo màn hình, để nút Back của trình duyệt còn có nghĩa.
  useEffect(() => {
    syncHash(screen);
  }, [screen]);

  useEffect(() => {
    const onPop = () => {
      // Một lượt trải không nằm trong URL, nên Back về bàn bài lúc không có
      // lượt nào đang mở thì đưa người dùng về màn chọn kiểu trải.
      const next = screenFromHash();
      const stale = (next === 'reading' || next === 'detail') && !activeRef.current;
      setScreen(stale ? 'spreads' : next);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const reset = useCallback((count) => {
    savedSignature.current = null;
    setSlots(Array(count).fill(null));
    setOpen([]);
    setDetail(0);
  }, []);

  // Lượt mới là lượt mới: câu hỏi của lần trước không được ở lại trong ô nhập.
  const chooseSpread = useCallback(
    (key) => {
      clearTimeout(shuffleTimer.current);
      setSpreadKey(key);
      setScreen('reading');
      setPhase('ask');
      setQuestion('');
      setActive(true);
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

  /** Rút mà không đặt câu hỏi — bỏ luôn chữ đã gõ dở rồi xào. */
  const skipQuestion = useCallback(() => {
    setQuestion('');
    startShuffle();
  }, [startShuffle]);

  /** Vào bàn ngay, không xem hết hoạt cảnh xào bài. Bộ vẫn đã xào rồi. */
  const skipShuffle = useCallback(() => {
    clearTimeout(shuffleTimer.current);
    setPhase('draw');
  }, []);

  /** Đóng lượt trải: bàn bài coi như dọn, thanh menu thôi mời quay lại. */
  const endReading = useCallback(() => {
    setActive(false);
    setScreen('home');
  }, []);

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

  /** Xoá sạch nhật ký, cả trên máy lẫn trong bộ nhớ. */
  const forgetHistory = useCallback(() => {
    clearHistory();
    setHistory([]);
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

  // Ô đang xem mà trống thì lùi về lá đã lật đầu tiên. Không còn lá nào thì
  // để -1 và màn chi tiết tự hiện trạng thái rỗng — đừng giả vờ đó là lá 0.
  let detailIndex = detail;
  if (board[detailIndex] == null) {
    detailIndex = open.length ? open[0] : board.findIndex((v) => v !== null);
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
    active,
    allOpen,
    lastOpen,
    detailIndex,
    setQuestion,
    go,
    chooseSpread,
    startShuffle,
    skipQuestion,
    skipShuffle,
    endReading,
    placeCard,
    flip,
    openDetail,
    setDetail,
    forgetHistory,
  };
}

export { SHUFFLE_MS };
