import { useEffect, useState } from 'react';
import Home from './pages/Home.jsx';
import Quiz from './pages/Quiz.jsx';
import Result from './pages/Result.jsx';
import Contest from './pages/Contest.jsx';

// Trang tài liệu ôn thi có địa chỉ riêng để gửi link thẳng: /#thieu-nhi (bộ 1), /#thieu-nhi-2 (bộ 2)…
const CONTEST_HASH = '#thieu-nhi';
const contestHash = (setId) => (setId === 1 ? CONTEST_HASH : `${CONTEST_HASH}-${setId}`);

function routeFromHash() {
  const match = window.location.hash.match(/^#thieu-nhi(?:-(\d+))?$/);
  return match ? { screen: 'contest', setId: Number(match[1] ?? 1) } : { screen: 'home', setId: 1 };
}

export default function App() {
  const [screen, setScreen] = useState(() => routeFromHash().screen);
  const [contestSet, setContestSet] = useState(() => routeFromHash().setId);
  const [settings, setSettings] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const onHashChange = () => {
      const route = routeFromHash();
      setScreen(route.screen);
      setContestSet(route.setId);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const go = (next, setId = contestSet) => {
    const hash = next === 'contest' ? contestHash(setId) : '';
    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash || window.location.pathname);
    }
    setScreen(next);
    setContestSet(setId);
    window.scrollTo(0, 0);
  };

  const inQuiz = screen !== 'contest';

  return (
    <div className="app">
      <header className="topbar" onClick={() => go('home')}>
        <span className="star">★</span>
        <div>
          <h1>Discover Vietnam</h1>
          <p>Khám phá Việt Nam · English Quiz</p>
        </div>
      </header>

      <nav className="mainnav">
        <button className={inQuiz ? 'active' : ''} onClick={() => go('home')}>
          🇻🇳 Quiz Việt Nam
        </button>
        <button className={!inQuiz ? 'active' : ''} onClick={() => go('contest')}>
          🌏 Thiếu nhi VN vươn ra thế giới
        </button>
      </nav>

      <main className="container">
        {screen === 'home' && (
          <Home
            onStart={(s) => {
              setSettings(s);
              setScreen('quiz');
            }}
          />
        )}
        {screen === 'quiz' && (
          <Quiz
            settings={settings}
            onFinish={(r) => {
              setResult(r);
              setScreen('result');
            }}
            onQuit={() => setScreen('home')}
          />
        )}
        {screen === 'result' && (
          <Result
            result={result}
            onRetry={() => setScreen('quiz')}
            onHome={() => setScreen('home')}
          />
        )}
        {screen === 'contest' && <Contest setId={contestSet} onSelectSet={(id) => go('contest', id)} />}
      </main>
    </div>
  );
}
