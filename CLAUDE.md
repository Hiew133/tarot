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
npm run lint     # ESLint (react-hooks + jsx-a11y)
npm test         # Vitest, chạy một lượt
npm run build    # build production vào dist/
npm run preview  # xem thử bản build
```

Trước khi báo xong bất kỳ thay đổi nào: **`npm run lint && npm test && npm run
build`** phải xanh cả ba. Test chỉ phủ phần logic thuần (`src/lib/`) — phần kéo
thả, animation và bố cục thì vẫn phải mở `npm run dev` xem bằng mắt. Đừng báo
"đã test" khi mới chỉ build.

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
  styles.css         toàn bộ CSS (~830 dòng), CSS variables ở :root
  lib/
    useReading.js    ⭐ trạng thái một lượt trải — nguồn sự thật duy nhất
    deal.js          shuffleDeck() · placeAt() · readDraw() · drawName() — hàm thuần
    history.js       đọc/ghi/xoá localStorage (key 'tarot-nhatky', tối đa 20 mục)
    route.js         hash ↔ màn hình, phân biệt màn mở lại được và màn không
    assets.js        asset(path) — ghép BASE_URL cho file trong public/
    cardArt.js       cardArt(i) → đường dẫn ảnh mặt lá
    cardBack.jsx     CardBackProvider — context cho ảnh mặt lưng (PNG → SVG)
  data/
    deck.js          DECK: 22 lá Ẩn Chính, mỗi lá có nghĩa xuôi lẫn nghĩa ngược
    spreads.js       SPREADS: 4 kiểu trải; mỗi vị trí có {name, lens}
    reader.js        READER: nội dung trang "Về reader"
  screens/           8 màn, mỗi màn một file, nhận props thuần
  components/        SiteHeader, SlotGrid, CardFan, HeldCard, FlyingCard
```

**Không có router library.** Điều hướng là state: `screen` (`home` | `spreads` |
`reading` | `detail` | `history` | `about`) cộng `phase` khi `screen === 'reading'`
(`ask` | `shuffle` | `draw`). [`route.js`](src/lib/route.js) chỉ đồng bộ state đó
với `location.hash` để nút Back của trình duyệt còn có nghĩa. **Một lượt trải cố
tình không nằm trong URL** — bàn bài, câu hỏi và thứ tự xào chỉ sống trong bộ
nhớ, nên `#reading` mở từ tab mới sẽ rơi về màn chủ.

**Toàn bộ trạng thái lượt trải nằm trong [`useReading`](src/lib/useReading.js).**
`App` chỉ phân phối props xuống; các màn và component đều là hàm thuần theo
props, không tự giữ state nghiệp vụ (trừ state hiệu ứng cục bộ như `held`,
`flying`, `taken` trong `DrawScreen`). Thêm tính năng liên quan tới lượt trải
thì sửa `useReading`, đừng rải state ra các màn.

**Mô hình bàn bài:** `order` là cả bộ đã xào — mảng `{ i, rev }`, tức chỉ số vào
`DECK` cộng chiều xuôi/ngược. `board` là mảng theo vị trí, mỗi ô giữ một lá đã
rút hoặc `null`. Lá lấy từ chồng **theo thứ tự** (`order[số ô đã lấp]`), nhưng
đặt vào ô nào là do người dùng chọn — nên `board` không lấp tuần tự. Xào một lần
lúc bấm "Xào bài" nên không bao giờ trùng lá, và **chiều lá quyết ngay lúc xào**,
không đổi khi đặt xuống. Phần thuần nằm ở `deal.js` và có test.

**Nghĩa lá = lá × vị trí.** Lá cho nội dung (`long` / `rev.long`), vị trí cho câu
hỏi (`lens` trong `spreads.js`), màn chi tiết ghép hai thứ lại. Cố tình **không**
viết sẵn từng cặp lá × vị trí: 22 × 10 đoạn văn thì vừa khổng lồ vừa nhạt.

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
  trạng thái, không dùng `<div onClick>`. Thao tác chuột nào cũng phải có lối
  bàn phím tương đương.
- Mọi animation mới phải có nhánh `prefers-reduced-motion: reduce` (CSS ở cuối
  `styles.css`, JS thì `matchMedia` như trong `FlyingCard.jsx`).
- File trong `public/` phải lấy qua `asset()`, đừng viết chuỗi `'/assets/...'`
  thẳng vào code — xem mục đường dẫn bên dưới.
- Effect là để đồng bộ với thứ bên ngoài React, không phải để chỉnh state nội
  bộ. Cần giá trị dẫn xuất thì tính lúc render (xem `tabStop` trong `CardFan`).
  ESLint sẽ chặn, và cách sửa đúng là bỏ effect chứ không phải tắt luật.

## Chỗ dễ vấp

- **`CardFan` dùng transition longhand, không dùng shorthand.** Trộn shorthand
  `transition` với `transitionDelay` trong cùng style object thì React có thể bỏ
  mất delay — mà delay chính là hiệu ứng trải bài lần lượt. Đừng "dọn dẹp" chỗ này.
- **Quạt bài dùng roving tabindex**: cả 30 lá chỉ chiếm một điểm dừng Tab, mũi
  tên chạy dọc quạt, Enter/Space đi lối `quickPick`. Đừng đổi thành 30 nút cùng
  nằm trong chuỗi Tab.
- **`DrawScreen.pickUp` gắn listener trực tiếp, không qua `useEffect`.** Một cú
  bấm dứt khoát có thể nhả tay trước khi effect kịp chạy và lá sẽ kẹt trên tay.
- **Phân biệt kéo với bấm bằng khoảng cách so với điểm bấm xuống**, không dùng
  `e.movementX` — trình duyệt không có thuộc tính đó sẽ cho `NaN` và mọi cú kéo
  thành ra bấm gọn.
- **`FlyingCard` có `setTimeout` dự phòng** vì tab bị ẩn thì `animation.onfinish`
  không chạy. Giữ nguyên.
- **`slotFaceRect` / `emptySlotAt` đọc DOM trực tiếp** (`getBoundingClientRect`,
  `elementFromPoint`) — có chủ ý, vì cần toạ độ thật để lá bay đúng ô. Đổi cấu
  trúc DOM của `.slot` / `.slot__face` là gãy chỗ này.
- **Ô đang có lá bay tới (`landingIndex`) cố ý hiện như ô trống** để không thành
  hai lá cùng lúc.
- Ảnh lá bài tham chiếu theo chỉ số: `DECK[3]` ↔ `public/assets/cards/03.jpg`.
  Chèn lá vào giữa mảng `DECK` là lệch hết ảnh — chỉ nối thêm vào cuối.
- **`.shell` giữ lề ngang của cả app.** Lớp đi kèm nó (`.page`, `.hero`,
  `.shuffle`) phải dùng `padding-block`, không dùng shorthand `padding` — dùng
  shorthand là xoá lề và chữ chạm sát mép màn hình điện thoại.
- **Dev server của Vite thỉnh thoảng cache nhầm** khi file bị ghi lại nhiều lần
  liên tiếp, và báo `does not provide an export named ...` cho code hoàn toàn
  đúng. Nếu `npm run build` xanh mà trình duyệt vẫn đỏ thì khởi động lại dev
  server, đừng đi sửa code.

## Đường dẫn asset

Vite chỉ viết lại đường dẫn nó **nhìn thấy lúc build** — trong `index.html` và
trong các `import`. Chuỗi dựng lúc chạy thì nó không đụng tới, nên phải qua
[`asset()`](src/lib/assets.js) để ghép `import.meta.env.BASE_URL`. Không có bước
này thì bản deploy ở đường dẫn con (`/tarot/` trên GitHub Pages) mất sạch ảnh.

Trong `index.html` thì dùng `%BASE_URL%` — Vite thay lúc build, kể cả trong
thuộc tính `content` của thẻ `<meta>` mà nó không tự viết lại.

## Ảnh và bản quyền

Ảnh 22 lá là bản scan **Rider–Waite–Smith 1909**, đã hết hạn bản quyền, tải sẵn
về `public/assets/cards/` (~4,5 MB). Nguồn và giấy phép ghi trong
`public/assets/cards/NOTICE.txt` — **đừng xoá file đó**. Không hotlink Wikimedia
(bị chặn tốc độ, dính 429).

Mặt lưng lá: `cardBack.jsx` thử tải `public/assets/card-back.png` trước, không có
thì rơi về `card-back.svg`. Muốn dùng ảnh thật chỉ cần bỏ file PNG vào, không sửa code.

## CI và deploy

- [`ci.yml`](.github/workflows/ci.yml) chạy lint + test + build cho mọi push lên
  `main` và mọi PR.
- [`deploy.yml`](.github/workflows/deploy.yml) build với `BASE_PATH=/<tên-repo>/`
  rồi đẩy lên GitHub Pages.
- Deploy chỉ chạy được sau khi bật Pages trong Settings → Pages → Source:
  **GitHub Actions**. Đó là thao tác trong giao diện GitHub, không nằm trong repo.

## Git

- Branch chính: `main`. Remote: `origin` (GitHub `Hiew133/tarot`).
- Commit message tiếng Việt, dòng đầu là câu tóm tắt ở thể mệnh lệnh/mô tả ngắn.
- **Không thêm dòng `Co-Authored-By: Claude`** — chủ repo muốn author chỉ có tên mình.
- `node_modules/` và `dist/` đã nằm trong `.gitignore`; đừng commit chúng.
