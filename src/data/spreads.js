// Các kiểu trải. Số lá bằng độ dài mảng `pos`.
//
// Mỗi vị trí có `name` (nhãn trên bàn) và `lens` — câu hỏi mà ô đó đang đặt ra.
// Đây là cách app cho vị trí ảnh hưởng tới nghĩa mà không phải viết 22 × 10 đoạn
// văn: **vị trí đặt câu hỏi, lá trả lời**, còn việc ghép hai thứ lại là của
// người đọc. Viết sẵn từng cặp lá × vị trí thì vừa khổng lồ vừa nhạt.
export const SPREADS = {
  one: {
    name: 'Một lá trong ngày',
    desc: 'Hỏi nhanh, trả lời gọn. Hợp buổi sáng.',
    pos: [
      { name: 'Hôm nay', lens: 'Thứ đáng để mắt tới trong hôm nay là gì?' },
    ],
  },
  three: {
    name: 'Ba lá',
    desc: 'Quá khứ – Hiện tại – Tương lai. Kiểu trải phổ biến nhất.',
    pos: [
      { name: 'Quá khứ', lens: 'Chuyện gì đã đưa bạn tới chỗ đang đứng?' },
      { name: 'Hiện tại', lens: 'Ngay lúc này, thứ gì đang thật sự diễn ra?' },
      { name: 'Tương lai', lens: 'Cứ đà này thì mọi chuyện đi về đâu?' },
    ],
  },
  five: {
    name: 'Năm lá quyết định',
    desc: 'Khi đang phân vân giữa hai lựa chọn.',
    pos: [
      { name: 'Tình hình', lens: 'Bỏ hết cảm xúc ra, chuyện này thực chất là gì?' },
      { name: 'Trở ngại', lens: 'Cái gì đang cản, kể cả cái nằm trong bạn?' },
      { name: 'Nên làm', lens: 'Hướng nào đáng dồn sức vào?' },
      { name: 'Nên tránh', lens: 'Phản xạ quen thuộc nào lần này sẽ hại bạn?' },
      { name: 'Kết quả', lens: 'Nếu bạn đi hướng đó, cái gì mở ra?' },
    ],
  },
  celtic: {
    name: 'Celtic Cross',
    desc: 'Mười lá, đọc sâu. Dành khoảng 20 phút.',
    pos: [
      { name: 'Hiện tại', lens: 'Lõi của chuyện này là gì?' },
      { name: 'Thử thách', lens: 'Cái gì cắt ngang, dù tốt hay xấu?' },
      { name: 'Gốc rễ', lens: 'Bên dưới, thứ gì đang chống đỡ toàn bộ chuyện này?' },
      { name: 'Quá khứ', lens: 'Cái gì vừa đi qua và vẫn còn dư âm?' },
      { name: 'Mục tiêu', lens: 'Bạn đang nói với mình rằng mình muốn gì?' },
      { name: 'Sắp tới', lens: 'Nước cờ kế tiếp đang thành hình là gì?' },
      { name: 'Bản thân', lens: 'Bạn đang mang tư thế nào vào chuyện này?' },
      { name: 'Môi trường', lens: 'Người và hoàn cảnh quanh bạn đang đẩy về đâu?' },
      { name: 'Hy vọng & sợ hãi', lens: 'Điều bạn mong và điều bạn sợ — thường là một.' },
      { name: 'Kết quả', lens: 'Vòng này khép lại theo kiểu gì?' },
    ],
  },
};

export const SPREAD_KEYS = Object.keys(SPREADS);
