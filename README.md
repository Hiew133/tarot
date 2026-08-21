# Tarot

Web app trải bài tarot — dựng từ bản thiết kế `Tarot App.dc.html` trong
[Claude Design project](https://claude.ai/design/p/2b57b5a4-035d-4b9a-934d-efb6377fd7f4?file=Tarot+App.dc.html),
sau đó làm lại giao diện theo hướng web.

React + Vite, không có backend. Nhật ký lưu trong `localStorage`, không gửi đi đâu.

## Chạy

```bash
npm install
npm run dev
```

```bash
npm run lint   # ESLint: react-hooks + jsx-a11y
npm test       # Vitest, phủ phần logic thuần trong src/lib/
npm run build  # bản production vào dist/
```

Đẩy lên GitHub Pages tự động qua [deploy.yml](.github/workflows/deploy.yml) mỗi
lần push `main` — cần bật Settings → Pages → Source: GitHub Actions một lần.

## Giao diện

Layout web thật, không phải khung điện thoại: thanh đầu trang cố định (logo +
menu), nội dung trong khung `--shell` rộng 1180px, nền bàn bài tối với các panel
giấy sáng. Co giãn xuống tablet (1 cột, lưới 2 cột) và điện thoại.

`home → spreads → ask → shuffle → draw → detail`, cộng hai nhánh `history` và
`about`. Toàn bộ trạng thái một lượt trải nằm trong
[`useReading`](src/lib/useReading.js); `App` chỉ chọn màn hình để vẽ.

Mỗi màn có một hash trên URL ([route.js](src/lib/route.js)) nên nút Back của
trình duyệt hoạt động và tải lại trang giữ nguyên chỗ đang đứng. Riêng một lượt
trải thì không nằm trong URL — bàn bài chỉ sống trong bộ nhớ.

| Màn | File |
| --- | --- |
| Trang chủ | [HomeScreen](src/screens/HomeScreen.jsx) |
| Chọn kiểu trải | [SpreadsScreen](src/screens/SpreadsScreen.jsx) · [spreads.js](src/data/spreads.js) |
| Đặt câu hỏi | [AskScreen](src/screens/AskScreen.jsx) |
| Xào bài | [ShuffleScreen](src/screens/ShuffleScreen.jsx) |
| Bàn bài | [DrawScreen](src/screens/DrawScreen.jsx) |
| Chi tiết lá | [DetailScreen](src/screens/DetailScreen.jsx) |
| Nhật ký | [HistoryScreen](src/screens/HistoryScreen.jsx) |
| Về reader | [AboutScreen](src/screens/AboutScreen.jsx) |

## Ba animation

| Animation | Ở đâu | Làm gì |
| --- | --- | --- |
| Xào bài | [ShuffleScreen](src/screens/ShuffleScreen.jsx) + keyframes `riffle` | 18 lá tách hai nửa, nghiêng ra, cài răng lược rồi rơi lại thành chồng. Mỗi lá trễ 42 ms nên thành một dòng chảy liên tục. |
| Trải bài | [CardFan](src/components/CardFan.jsx) | 30 lá xoè thành vòng cung rộng ~940px, lá này nối lá kia (trễ 26 ms/lá). Rê chuột thì lá nhô lên và sáng viền. |
| Bốc bài | [HeldCard](src/components/HeldCard.jsx) + [FlyingCard](src/components/FlyingCard.jsx) | Bốc lá lên là lá thẳng người, to gần gấp đôi và **bám theo con trỏ**; kéo tới ô nào thì ô đó sáng viền vàng; thả tay là lá búng gọn vào ô. |

Vị trí từng lá trong quạt tính từ u ∈ [−1, 1]: lệch ngang theo `u`, võng xuống
theo `u²`, nghiêng theo `u`. Bề rộng quạt đo theo khung nên co giãn được mà hình
vòng cung không đổi.

### Bốc lên — di chuyển — đặt xuống

Cách chính là **kéo thả**: bấm giữ một lá trong quạt, lá lên tay và đi theo con
trỏ, các ô còn trống sáng lên cho biết thả được ở đâu, kéo tới ô muốn đặt rồi nhả
tay. Thả ra ngoài ô thì lá quay lại quạt, không mất.

**Bạn tự chọn ô**, không bắt buộc theo thứ tự — bàn bài là mảng theo vị trí
(`board` trong [useReading](src/lib/useReading.js)), lá lấy từ chồng đã xào theo
thứ tự nhưng đặt ở đâu là tuỳ bạn.

Bấm gọn một cái (không kéo) là lối tắt: lá tự bốc lên giữa bàn, phóng to 2,6 lần,
giữ một nhịp rồi về ô trống đầu tiên.

Trong lúc lá đang bay, ô đích vẫn giữ vẻ trống để không hiện thành hai lá.

**Bằng bàn phím**: Tab tới quạt bài (cả 30 lá chỉ chiếm một điểm dừng Tab), mũi
tên trái/phải chạy dọc quạt, Enter hoặc Space rút lá đang chọn theo lối rút
nhanh. Sau đó Tab tới từng ô để lật và đọc.

## Ảnh và logo

- **Logo** — [`public/assets/logo.svg`](public/assets/logo.svg), vẽ riêng cho app
  này: trăng tròn, cổng torii, dáng núi. Dùng luôn làm favicon.
- **Mặt lưng lá bài** — [`public/assets/card-back.svg`](public/assets/card-back.svg),
  vẽ theo phong cách ảnh mẫu: Phú Sĩ dưới trăng vàng, torii và tháp bên suối, hoa
  anh đào, khung cổ vàng/chàm.

Bản gốc `assets/card-back.png` trong file thiết kế **vượt giới hạn đọc 256 KiB**
của DesignSync nên bản kéo về bị cắt cụt (196 608 byte, không có chunk `IEND`).
Muốn dùng ảnh thật: bỏ file PNG vào `public/assets/card-back.png` là xong — không
phải sửa code. [`cardBack.jsx`](src/lib/cardBack.jsx) tự dò lúc khởi động, có PNG
thì dùng PNG, chưa có thì rơi về SVG.

### Ảnh mặt 22 lá

Nằm sẵn trong [`public/assets/cards/`](public/assets/cards/) — `00.jpg` là Kẻ Khờ,
`21.jpg` là Thế Giới, đúng theo chỉ số trong [deck.js](src/data/deck.js). Lấy qua
helper [`cardArt()`](src/lib/cardArt.js).

Nguồn: bộ **Rider–Waite–Smith 1909** (Pamela Colman Smith), **đã hết hạn bản
quyền** ở Mỹ và Anh, tải từ Wikimedia Commons qua `Special:FilePath` ở
`width=500` (~209 KB/lá, 4,5 MB tổng). Chi tiết trong
[`NOTICE.txt`](public/assets/cards/NOTICE.txt).

Về API: `tarotapi.dev` chỉ trả **chữ** (nghĩa xuôi/ngược, mô tả), **không có
ảnh**. Wikimedia có ảnh nhưng **chặn tốc độ** — gọi liên tiếp là dính 429 — nên
ảnh được tải sẵn về repo thay vì hotlink.

## Khác với bản thiết kế

- **Giao diện web** thay cho khung điện thoại 430 × 932: thanh menu, khung rộng,
  lưới nhiều cột, panel giấy trên nền bàn tối.
- **Animation làm mới hoàn toàn** (bản gốc chỉ có hai lá rung khi xào, không có
  trải bài, rút bài chỉ là kéo lên rồi biến mất).
- **Xào bài là thật.** Cả bộ được xào một lần (Fisher–Yates) lúc bấm "Xào bài",
  mỗi lần rút lấy lá kế tiếp trên chồng — không còn phụ thuộc ngẫu nhiên giữa chừng.
- **Dùng `<button>` thật** kèm `aria-label` cho ô bài, thẻ kiểu trải và cả lá
  trong quạt — rút bài bằng bàn phím được, không chỉ bằng chuột.
- **`prefers-reduced-motion`**: xào bài chậm lại, lá bay rút còn 160 ms, bỏ hiệu
  ứng lật và độ trễ trải quạt.

Bộ bài hiện có 22 lá Ẩn Chính ([deck.js](src/data/deck.js)). Thêm 56 lá Ẩn Phụ
chỉ cần nối tiếp vào mảng đó.
