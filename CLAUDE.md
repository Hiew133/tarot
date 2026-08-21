# CLAUDE.md

Hướng dẫn cho Claude Code khi làm việc trong repo này.

## Repo này là gì

Web app trải bài tarot, chạy hoàn toàn ở client — **không có backend, không có
API, không có database**. Mọi thứ nằm trong bundle tĩnh; nhật ký lưu ở
`localStorage` của người dùng.

Code nằm **ngay ở gốc repo**.

## Lệnh

```bash
npm install      # lần đầu
npm run dev      # dev server, http://localhost:5173
npm run build    # build production vào dist/
npm run preview  # xem thử bản build
```

Chưa có test runner, chưa có linter, chưa có type checking. Cách kiểm tra một
thay đổi là `npm run build` (bắt lỗi import/cú pháp) rồi mở `npm run dev` xem
bằng mắt. Đừng báo "đã test" khi mới chỉ build.

`.claude/launch.json` đã cấu hình sẵn cho `preview_start` với tên `tarot`.

## Stack

React 19 + Vite 6, JavaScript thuần (JSX, không TypeScript), CSS viết tay trong
một file `src/styles.css`. Dependency runtime chỉ có `react` và `react-dom` —
**giữ nguyên như vậy**, đừng thêm router, state library, UI kit hay animation
library nếu chưa hỏi.

## Kiến trúc

```
src/
  main.jsx           điểm vào, mount <App/> trong StrictMode
  App.jsx            router thủ công: đọc r.screen/r.phase rồi chọn màn để vẽ
  styles.css         toàn bộ CSS (~800 dòng), CSS variables ở :root
  lib/
    useReading.js    ⭐ trạng thái một lượt trải — nguồn sự thật duy nhất
    deal.js          shuffleDeck() — Fisher–Yates, trả về mảng chỉ số
    history.js       đọc/ghi localStorage (key 'tarot-nhatky', tối đa 20 mục)
    cardArt.js       cardArt(i) → đường dẫn ảnh mặt lá
    cardBack.jsx     CardBackProvider — context cho ảnh mặt lưng (PNG → SVG)
  data/
    deck.js          DECK: 22 lá Ẩn Chính {num, name, key, short, long}
    spreads.js       SPREADS: 4 kiểu trải, số lá = độ dài mảng `pos`
  screens/           8 màn, mỗi màn một file, nhận props thuần
  components/        SiteHeader, SlotGrid, CardFan, HeldCard, FlyingCard
```

**Không có router.** Điều hướng là state: `screen` (`home` | `spreads` |
`reading` | `detail` | `history` | `about`) cộng `phase` khi `screen === 'reading'`
(`ask` | `shuffle` | `draw`). Không có URL, không có history API — bấm Back của
trình duyệt là thoát app.

**Toàn bộ trạng thái lượt trải nằm trong [`useReading`](src/lib/useReading.js).**
`App` chỉ phân phối props xuống; các màn và component đều là hàm thuần theo
props, không tự giữ state nghiệp vụ (trừ state hiệu ứng cục bộ như `held`,
`flying`, `taken` trong `DrawScreen`). Thêm tính năng liên quan tới lượt trải
thì sửa `useReading`, đừng rải state ra các màn.

**Mô hình bàn bài:** `order` là cả bộ đã xào (mảng chỉ số vào `DECK`), `board`
là mảng theo vị trí, mỗi ô giữ chỉ số lá hoặc `null`. Lá lấy từ chồng **theo thứ
tự** (`order[số ô đã lấp]`), nhưng đặt vào ô nào là do người dùng chọn — nên
`board` không lấp tuần tự. Xào một lần lúc bấm "Xào bài" nên không bao giờ trùng lá.

## Quy ước

- **Tiếng Việt ở mọi nơi người đọc thấy**: chuỗi UI, comment, commit message,
  README. Tên biến/hàm/file thì tiếng Anh.
- Comment giải thích **tại sao**, không phải cái gì — xem các docblock ở đầu
  `useReading.js`, `CardFan.jsx`, `FlyingCard.jsx` làm mẫu. Giữ đúng mật độ đó,
  đừng thêm comment kiểu `// set state`.
- CSS: một file duy nhất, chia theo khối `/* ── Tên khối ── */`. Class đặt theo
  BEM rút gọn (`.slot`, `.slot__face`, `.slot--empty`). Màu/khoảng cách lấy từ
  CSS variable ở `:root`, **đừng hardcode mã màu mới**.
- Số ma thuật của animation đặt thành const có tên ở đầu file kèm comment đơn vị
  (`const HELD_SCALE = 1.95;`, `const DEAL_STEP = 26;`).
- Phần tử bấm được phải là `<button type="button">` thật kèm `aria-label` mô tả
  trạng thái, không dùng `<div onClick>`.
- Mọi animation mới phải có nhánh `prefers-reduced-motion: reduce` (CSS ở cuối
  `styles.css`, JS thì `matchMedia` như trong `FlyingCard.jsx`).

## Chỗ dễ vấp

- **`CardFan` dùng transition longhand, không dùng shorthand.** Trộn shorthand
  `transition` với `transitionDelay` trong cùng style object thì React có thể bỏ
  mất delay — mà delay chính là hiệu ứng trải bài lần lượt. Đừng "dọn dẹp" chỗ này.
- **`DrawScreen.pickUp` gắn listener trực tiếp, không qua `useEffect`.** Một cú
  bấm dứt khoát có thể nhả tay trước khi effect kịp chạy và lá sẽ kẹt trên tay.
- **`FlyingCard` có `setTimeout` dự phòng** vì tab bị ẩn thì `animation.onfinish`
  không chạy. Giữ nguyên.
- **`slotFaceRect` / `emptySlotAt` đọc DOM trực tiếp** (`getBoundingClientRect`,
  `elementFromPoint`) — có chủ ý, vì cần toạ độ thật để lá bay đúng ô. Đổi cấu
  trúc DOM của `.slot` / `.slot__face` là gãy chỗ này.
- **Ô đang có lá bay tới (`landingIndex`) cố ý hiện như ô trống** để không thành
  hai lá cùng lúc.
- Ảnh lá bài tham chiếu theo chỉ số: `DECK[3]` ↔ `public/assets/cards/03.jpg`.
  Chèn lá vào giữa mảng `DECK` là lệch hết ảnh — chỉ nối thêm vào cuối.

## Ảnh và bản quyền

Ảnh 22 lá là bản scan **Rider–Waite–Smith 1909**, đã hết hạn bản quyền, tải sẵn
về `public/assets/cards/` (~4,5 MB). Nguồn và giấy phép ghi trong
`public/assets/cards/NOTICE.txt` — **đừng xoá file đó**. Không hotlink Wikimedia
(bị chặn tốc độ, dính 429).

Mặt lưng lá: `cardBack.jsx` thử tải `public/assets/card-back.png` trước, không có
thì rơi về `card-back.svg`. Muốn dùng ảnh thật chỉ cần bỏ file PNG vào, không sửa code.

## Git

- Branch chính: `main`. Remote: `origin` (GitHub `Hiew133/tarot`).
- Commit message tiếng Việt, dòng đầu là câu tóm tắt ở thể mệnh lệnh/mô tả ngắn.
- **Không thêm dòng `Co-Authored-By: Claude`** — chủ repo muốn author chỉ có tên mình.
- `node_modules/` và `dist/` đã nằm trong `.gitignore`; đừng commit chúng.
