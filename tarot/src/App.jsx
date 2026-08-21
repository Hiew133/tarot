import SiteHeader from './components/SiteHeader.jsx';
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

export default function App({ readerName = 'Linh Đan' }) {
  const r = useReading();

  const questionLine = r.question
    ? `“${r.question}”`
    : 'Không đặt câu hỏi — cứ để bài nói.';

  // Đang trong một lượt trải thì mục "Trải bài" trên thanh menu vẫn sáng.
  const navCurrent = r.screen === 'reading' || r.screen === 'detail' ? 'spreads' : r.screen;

  return (
    <CardBackProvider>
      <div className="app">
        <SiteHeader current={navCurrent} onGo={r.go} />

        <main className="main">
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
            />
          )}

          {r.screen === 'reading' && r.phase === 'shuffle' && <ShuffleScreen />}

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
              onReadResults={() => r.openDetail(0)}
              onDone={() => r.go('home')}
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
            <HistoryScreen history={r.history} onStart={() => r.go('spreads')} />
          )}

          {r.screen === 'about' && <AboutScreen readerName={readerName} />}
        </main>
      </div>
    </CardBackProvider>
  );
}
