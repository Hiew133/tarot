import { useCallback, useEffect, useRef, useState } from 'react';
import CardFan from '../components/CardFan.jsx';
import FlyingCard from '../components/FlyingCard.jsx';
import HeldCard from '../components/HeldCard.jsx';
import SlotGrid from '../components/SlotGrid.jsx';
import { DECK } from '../data/deck.js';
import { FAN_CARD_W } from '../lib/cardBack.jsx';

const HELD_SCALE = 1.95;  // lá to cỡ nào lúc cầm trên tay
const DRAG_SLOP = 6;      // đi quá bấy nhiêu px thì tính là kéo, không phải bấm
const MAX_TILT = 14;      // lá nghiêng tối đa khi kéo ngang

/** Ô trống nằm dưới điểm (x, y), hoặc null nếu không có. */
function emptySlotAt(x, y) {
  const hit = document.elementFromPoint(x, y);
  const holder = hit?.closest('[data-slot]');
  if (!holder || !holder.classList.contains('slot--empty')) return null;
  return Number(holder.dataset.slot);
}

function slotFaceRect(index) {
  const face = document.querySelector(`[data-slot="${index}"] .slot__face`);
  if (!face) return null;
  const box = face.getBoundingClientRect();
  return { cx: box.left + box.width / 2, cy: box.top + box.height / 2, w: box.width };
}

/** Gợi ý bám theo bước người dùng đang ở. */
function buildHint({ positions, board, filled, allOpen, lastOpen, holding }) {
  if (holding) {
    return { title: 'Đang cầm bài', body: 'Kéo lá tới ô bạn muốn rồi thả tay để đặt xuống.' };
  }
  if (filled === 0) {
    return { title: 'Bước 1', body: 'Bốc một lá trong quạt rồi kéo tới ô bạn muốn đặt. Bấm một cái là lá tự về ô trống đầu tiên.' };
  }
  if (lastOpen < 0) {
    return { title: 'Bước 2', body: 'Chạm vào lá úp trên bàn để lật nó lên.' };
  }
  if (!allOpen) {
    return { title: positions[lastOpen], body: DECK[board[lastOpen]].short };
  }
  return {
    title: `Đủ ${positions.length} lá`,
    body: 'Chạm lại từng lá để đọc chi tiết, hoặc mở phần đọc kết quả.',
  };
}

export default function DrawScreen({
  spreadName,
  questionLine,
  positions,
  board,
  filled,
  open,
  allOpen,
  lastOpen,
  onBack,
  onPlace,
  onFlip,
  onOpenDetail,
  onReadResults,
  onDone,
}) {
  const tableRef = useRef(null);
  const [taken, setTaken] = useState(() => new Set());
  const [held, setHeld] = useState(null);
  const [flying, setFlying] = useState(null);

  const total = positions.length;
  const done = filled >= total;

  // Lượt mới thì trả lại đủ bài cho quạt.
  useEffect(() => {
    if (filled === 0) setTaken(new Set());
  }, [filled]);

  const land = useCallback(
    (position, from) => {
      const rect = slotFaceRect(position);
      if (rect) setFlying({ index: position, from, to: rect });
      onPlace(position);
    },
    [onPlace]
  );

  const release = useRef(null);
  useEffect(() => () => release.current?.(), []);

  /**
   * Bốc một lá lên tay.
   *
   * Gắn listener ngay tại đây chứ không qua useEffect: một cú bấm dứt khoát có
   * thể nhả tay trước khi effect kịp chạy, và khi đó lá sẽ kẹt lại trên tay.
   * `board` không đổi suốt lúc cầm bài (chỉ lúc thả mới đặt) nên đóng gói giá
   * trị hiện tại vào đây là an toàn.
   */
  const pickUp = useCallback(
    (fanIndex, info) => {
      const grabX = info.offsetX;
      const grabY = info.offsetY;
      let moved = false;
      let lastX = info.x;

      setHeld({
        fanIndex,
        x: info.x + grabX,
        y: info.y + grabY,
        tilt: info.rotate,
        target: null,
      });

      const move = (e) => {
        // Đo bằng khoảng cách so với chỗ bấm xuống chứ không dùng movementX:
        // trình duyệt cũ không có thuộc tính đó, và khi ấy mọi cú kéo đều bị
        // hiểu nhầm thành bấm gọn.
        if (Math.abs(e.clientX - info.x) + Math.abs(e.clientY - info.y) > DRAG_SLOP) {
          moved = true;
        }
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        const target = emptySlotAt(e.clientX, e.clientY);
        setHeld((h) =>
          h
            ? {
                ...h,
                x: e.clientX + grabX,
                y: e.clientY + grabY,
                tilt: Math.max(-MAX_TILT, Math.min(MAX_TILT, dx * 1.6)),
                target,
              }
            : h
        );
      };

      const detach = () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', finish);
        window.removeEventListener('pointercancel', finish);
        release.current = null;
      };

      function finish(e) {
        detach();
        setHeld(null);

        const from = {
          cx: e.clientX + grabX,
          cy: e.clientY + grabY,
          rotate: 0,
          scale: HELD_SCALE,
        };
        const target = emptySlotAt(e.clientX, e.clientY);

        if (target !== null) {
          setTaken((prev) => new Set(prev).add(fanIndex));
          land(target, from);
          return;
        }
        if (moved) return;  // kéo ra chỗ trống rồi thả — lá quay lại quạt

        // Bấm gọn một cái: lá tự bốc lên giữa bàn rồi về ô trống đầu tiên.
        const spot = board.findIndex((v) => v === null);
        const area = tableRef.current?.getBoundingClientRect();
        const rect = spot >= 0 ? slotFaceRect(spot) : null;
        if (spot < 0 || !rect || !area) return;

        setTaken((prev) => new Set(prev).add(fanIndex));
        setFlying({
          index: spot,
          from: { cx: from.cx, cy: from.cy, rotate: info.rotate, scale: 1 },
          stage: { cx: area.left + area.width / 2, cy: area.top + area.height * 0.42 },
          to: rect,
        });
        onPlace(spot);
      }

      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', finish);
      window.addEventListener('pointercancel', finish);
      release.current = detach;
    },
    [board, land, onPlace]
  );

  const hint = buildHint({
    positions, board, filled, allOpen, lastOpen, holding: Boolean(held),
  });

  return (
    <div className="shell table" ref={tableRef}>
      <div className="table__head">
        <div>
          <button type="button" className="back" onClick={onBack}>
            ← Đổi kiểu trải
          </button>
          <h1 className="h2">{spreadName}</h1>
          <div className="table__q">{questionLine}</div>
        </div>
        <div className="table__progress">
          {filled}/{total} lá
        </div>
      </div>

      <SlotGrid
        positions={positions}
        board={board}
        open={open}
        landingIndex={flying?.index ?? null}
        dropTarget={held?.target ?? null}
        armed={Boolean(held)}
        onFlip={onFlip}
        onOpenDetail={onOpenDetail}
      />

      <div className="hint" role="status">
        <div className="hint__title">{hint.title}</div>
        <div className="hint__body">{hint.body}</div>
      </div>

      {allOpen && (
        <div className="table__actions">
          <button type="button" className="btn btn--gold" onClick={onReadResults}>
            Đọc kết quả
          </button>
          <button type="button" className="btn btn--ghost" onClick={onDone}>
            Xong
          </button>
        </div>
      )}

      <CardFan
        taken={taken}
        grabbed={held?.fanIndex ?? null}
        disabled={done}
        onPickUp={pickUp}
      />

      {held && (
        <HeldCard x={held.x} y={held.y} tilt={held.tilt} overSlot={held.target !== null} />
      )}

      {flying && (
        <FlyingCard
          key={`${flying.index}-${filled}`}
          from={flying.from}
          stage={flying.stage}
          to={flying.to}
          onDone={() => setFlying(null)}
        />
      )}
    </div>
  );
}

export { FAN_CARD_W };
