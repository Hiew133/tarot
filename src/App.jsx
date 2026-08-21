import SiteHeader from './components/SiteHeader.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import { CardBackProvider } from './lib/cardBack.jsx';
import { useReading } from './lib/useReading.js';
import HomeScreen from './screens/HomeScreen.jsx';
import SpreadsScreen from './screens/SpreadsScreen.jsx';
import AskScreen from './screens/AskScreen.jsx';
import ShuffleScreen from './screens/ShuffleScreen.jsx';
import DrawScreen from './screens/DrawScreen.jsx';
import DetailScreen from './screens/DetailScreen.jsx';
import HistoryScreen from './screens/HistoryScreen.jsx';
import AboutScreen from './screens/AboutScreen.jsx';

export default function App() {
  const r = useReading();

  const questionLine = r.question
    ? `“${r.question}”`
    : 'Không đặt câu hỏi — cứ để bài nói.';

  // Đang trong một lượt trải thì mục "Trải bài" trên thanh menu vẫn sáng.
  const navCurrent = r.screen === 'reading' || r.screen === 'detail' ? 'spreads' : r.screen;

  return (
    <CardBackProvider>
      <div className="app">
        {/* Lối tắt cho người dùng bàn phím: Tab phát đầu tiên là nhảy thẳng vào
            nội dung, khỏi phải đi qua cả thanh menu.

            Tự chuyển focus thay vì để trình duyệt nhảy theo hash: app dùng
            `location.hash` làm địa chỉ màn hình, đổi nó thành #noi-dung là
            điều hướng lạc sang màn khác. */}
        <a
          className="skip-link"
          href="#noi-dung"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('noi-dung')?.focus();
          }}
        >
          Tới nội dung chính
        </a>

        <SiteHeader current={navCurrent} resuming={r.active} onGo={r.go} />

        <main className="main" id="noi-dung" tabIndex={-1}>
          {r.screen === 'home' && (
            <HomeScreen
              onStart={() => r.go('spreads')}
              onHistory={() => r.go('history')}
            />
          )}

          {r.screen === 'spreads' && <SpreadsScreen onChoose={r.chooseSpread} />}

          {r.screen === 'reading' && r.phase === 'ask' && (
            <AskScreen
              spreadName={r.spread.name}
              question={r.question}
              onQuestion={r.setQuestion}
              onBack={() => r.go('spreads')}
              onShuffle={r.startShuffle}
              onSkip={r.skipQuestion}
            />
          )}

          {r.screen === 'reading' && r.phase === 'shuffle' && (
            <ShuffleScreen onSkip={r.skipShuffle} />
          )}

          {r.screen === 'reading' && r.phase === 'draw' && (
            <DrawScreen
              spreadName={r.spread.name}
              questionLine={questionLine}
              positions={r.positions}
              board={r.board}
              filled={r.filled}
              open={r.open}
              allOpen={r.allOpen}
              lastOpen={r.lastOpen}
              onBack={() => r.go('spreads')}
              onPlace={r.placeCard}
              onFlip={r.flip}
              onOpenDetail={r.openDetail}
              onReadResults={() => r.openDetail(r.open[0] ?? 0)}
              onDone={r.endReading}
            />
          )}

          {r.screen === 'detail' && (
            <DetailScreen
              positions={r.positions}
              board={r.board}
              open={r.open}
              detailIndex={r.detailIndex}
              onBack={() => r.go('reading')}
              onSelect={r.setDetail}
            />
          )}

          {r.screen === 'history' && (
            <HistoryScreen
              history={r.history}
              onStart={() => r.go('spreads')}
              onClear={r.forgetHistory}
            />
          )}

          {r.screen === 'about' && <AboutScreen />}
        </main>

        {/* Bàn bài được tính để lọt đúng một màn hình; thêm chân trang vào đó là
            đẻ ra thanh cuộn ngay. Các màn còn lại thì cuộn bình thường. */}
        {r.screen !== 'reading' && <SiteFooter />}
      </div>
    </CardBackProvider>
  );
}
