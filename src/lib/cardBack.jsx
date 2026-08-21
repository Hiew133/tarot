import { createContext, useContext, useEffect, useState } from 'react';
import { asset } from './assets.js';

const PNG = asset('assets/card-back.png');
const SVG = asset('assets/card-back.svg');

/** Bề ngang lá bài trong quạt — mốc để tính tỉ lệ khi bay vào ô. */
export const FAN_CARD_W = 78;

const CardBackContext = createContext(SVG);

/**
 * Mặt lưng lá bài.
 *
 * Ưu tiên `public/assets/card-back.png` (ảnh thật). Chỉ khi file đó chưa có
 * thì mới dùng SVG thay thế — nên chỉ cần bỏ file PNG vào là app tự đổi, không
 * phải sửa dòng nào.
 */
export function CardBackProvider({ children }) {
  const [src, setSrc] = useState(SVG);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setSrc(PNG);
    img.src = PNG;
  }, []);

  return <CardBackContext.Provider value={src}>{children}</CardBackContext.Provider>;
}

export function useCardBack() {
  return useContext(CardBackContext);
}
