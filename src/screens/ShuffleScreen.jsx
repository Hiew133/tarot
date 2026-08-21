import { useCardBack } from '../lib/cardBack.jsx';

const RIFFLE_N = 18;

/**
 * Xào bài kiểu riffle: chồng bài tách làm hai nửa, hai nửa nghiêng ra rồi cài
 * răng lược vào nhau và rơi lại thành chồng. Mỗi lá lệch pha một chút nên nhìn
 * thành một dòng chảy liên tục thay vì cả chồng nhảy cùng lúc.
 */
export default function ShuffleScreen() {
  const cardBack = useCardBack();

  return (
    <div className="shell shuffle">
      <div className="shuffle__deck" aria-hidden="true">
        {Array.from({ length: RIFFLE_N }, (_, i) => (
          <img
            key={i}
            className="shuffle__card"
            src={cardBack}
            alt=""
            style={{
              '--i': i,
              '--dir': i % 2 === 0 ? -1 : 1,   // nửa trái / nửa phải
              '--lift': (RIFFLE_N - i) * 0.7,  // độ dày chồng bài
            }}
          />
        ))}
      </div>
      <p className="shuffle__label" role="status">Đang xào bài…</p>
    </div>
  );
}
