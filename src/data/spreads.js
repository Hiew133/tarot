// Các kiểu trải. `pos` là tên từng vị trí — số lá bằng độ dài mảng.
export const SPREADS = {
  one: {
    name: 'Một lá trong ngày',
    desc: 'Hỏi nhanh, trả lời gọn. Hợp buổi sáng.',
    pos: ['Hôm nay'],
  },
  three: {
    name: 'Ba lá',
    desc: 'Quá khứ – Hiện tại – Tương lai. Kiểu trải phổ biến nhất.',
    pos: ['Quá khứ', 'Hiện tại', 'Tương lai'],
  },
  five: {
    name: 'Năm lá quyết định',
    desc: 'Khi đang phân vân giữa hai lựa chọn.',
    pos: ['Tình hình', 'Trở ngại', 'Nên làm', 'Nên tránh', 'Kết quả'],
  },
  celtic: {
    name: 'Celtic Cross',
    desc: 'Mười lá, đọc sâu. Dành khoảng 20 phút.',
    pos: [
      'Hiện tại', 'Thử thách', 'Gốc rễ', 'Quá khứ', 'Mục tiêu',
      'Sắp tới', 'Bản thân', 'Môi trường', 'Hy vọng & sợ hãi', 'Kết quả',
    ],
  },
};

export const SPREAD_KEYS = Object.keys(SPREADS);
