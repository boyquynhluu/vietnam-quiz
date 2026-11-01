import { useState } from 'react';
import Home from './pages/Home.jsx';
import Quiz from './pages/Quiz.jsx';
import Result from './pages/Result.jsx';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [settings, setSettings] = useState(null);
  const [result, setResult] = useState(null);

  return (
    <div className="app">
      <header className="topbar" onClick={() => setScreen('home')}>
        <span className="star">★</span>
        <div>
          <h1>Discover Vietnam</h1>
          <p>Khám phá Việt Nam · English Quiz</p>
        </div>
      </header>

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
      </main>
    </div>
  );
}
