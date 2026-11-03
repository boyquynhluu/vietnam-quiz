import { useState } from 'react';
import { CONTEST_SETS, TITLE, gradeContestAnswers, loadContestQuestions } from '../data/contest/index.js';
import Quiz from './Quiz.jsx';
import Result from './Result.jsx';

const countQuestions = (topics) => topics.reduce((sum, t) => sum + t.questions.length, 0);
const LANGS = [
  { value: 'both', label: 'Song ngữ' },
  { value: 'en', label: 'English' },
  { value: 'vi', label: 'Tiếng Việt' },
];

/** Renders **bold** and [placeholder] markers used in the data file. */
function RichText({ text }) {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\])/).map((part, i) => {
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('[')) return <mark key={i} className="blank">{part}</mark>;
    return part;
  });
}

const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;

function speak(text) {
  window.speechSynthesis.cancel();
  // Bỏ ký hiệu định dạng; chỗ cần điền đọc thành khoảng lặng ngắn
  const plain = text.replace(/\*\*/g, '').replace(/\[[^\]]+\]/g, '…');
  const utterance = new SpeechSynthesisUtterance(plain);
  utterance.lang = 'en-US';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

const TOPIC_ICONS = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];

/** Cùng luồng với quiz chính: chọn chủ đề -> Quiz (từng câu) -> Result; câu hỏi và chấm điểm lấy từ bộ đề. */
function ContestQuiz({ set }) {
  const [stage, setStage] = useState('start');
  const [topicIndex, setTopicIndex] = useState(null);
  const [settings, setSettings] = useState(null);
  const [result, setResult] = useState(null);

  if (stage === 'quiz') {
    return (
      <Quiz
        settings={settings}
        load={loadContestQuestions}
        grade={gradeContestAnswers}
        onFinish={(r) => {
          setResult(r);
          setStage('result');
        }}
        onQuit={() => setStage('start')}
      />
    );
  }
  if (stage === 'result') {
    return <Result result={result} onRetry={() => setStage('quiz')} onHome={() => setStage('start')} />;
  }

  return (
    <section className="card">
      <h2>Chọn chủ đề</h2>
      <div className="category-grid">
        <button
          className={`category ${topicIndex === null ? 'selected' : ''}`}
          onClick={() => setTopicIndex(null)}
        >
          <span className="icon">📚</span>
          <strong>All topics</strong>
          <small>Cả bộ đề · {countQuestions(set.topics)} câu</small>
        </button>
        {set.topics.map((t, i) => (
          <button
            key={t.id}
            className={`category ${topicIndex === i ? 'selected' : ''}`}
            onClick={() => setTopicIndex(i)}
          >
            <span className="icon">{TOPIC_ICONS[i]}</span>
            <strong>{t.english}</strong>
            <small>
              {t.vietnamese} · {t.questions.length} câu
            </small>
          </button>
        ))}
      </div>
      <button
        className="primary big"
        onClick={() => {
          setSettings({ setId: set.id, topicIndex });
          setStage('quiz');
        }}
      >
        Bắt đầu · Start
      </button>
    </section>
  );
}

function Speech({ speech, tips }) {
  const [lang, setLang] = useState('both');

  return (
    <>
      <section className="card">
        <h2>{speech.english}</h2>
        <p className="muted topic-vi">{speech.vietnamese}</p>
        <div className="chips">
          {LANGS.map((l) => (
            <button
              key={l.value}
              className={`chip ${lang === l.value ? 'selected' : ''}`}
              onClick={() => setLang(l.value)}
            >
              {l.label}
            </button>
          ))}
        </div>
        <p className="muted">
          Thay các ô <mark className="blank">[ ]</mark> bằng thông tin của bé.
          {canSpeak && ' Bấm 🔊 để nghe đọc mẫu tiếng Anh.'}
        </p>
      </section>

      {speech.sections.map((s) => (
        <section key={s.en} className="card speech">
          <h2>
            {lang === 'vi' ? s.vi : s.en}
            {lang === 'both' && <span className="muted"> · {s.vi}</span>}
          </h2>
          {lang !== 'vi' &&
            s.english.map((p, i) => (
              <p key={i} className="speech-en">
                {canSpeak && (
                  <button className="speak" title="Nghe đọc" onClick={() => speak(p)}>
                    🔊
                  </button>
                )}
                {/* bọc span: .speech-en là flex, không bọc thì mỗi đoạn chữ / ô điền thành 1 cột */}
                <span>
                  <RichText text={p} />
                </span>
              </p>
            ))}
          {lang !== 'en' &&
            s.vietnamese.map((p, i) => (
              <p key={i} className={lang === 'both' ? 'speech-vi' : ''}>
                <RichText text={p} />
              </p>
            ))}
        </section>
      ))}

      {tips.length > 0 && (
        <section className="card">
          <h2>Mẹo & gợi ý khi ghi hình / thuyết trình</h2>
          <ul className="tips">
            {tips.map((t) => (
              <li key={t.title}>
                <span className="icon">{t.icon}</span>
                <div>
                  <strong>{t.title}</strong>
                  <p>
                    <RichText text={t.text} />
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export default function Contest({ setId, onSelectSet }) {
  const [tab, setTab] = useState('quiz');
  const set = CONTEST_SETS.find((c) => c.id === setId) ?? CONTEST_SETS[0];
  const total = countQuestions(set.topics);

  return (
    <>
      <section className="card contest-head">
        <h2>🌏 {TITLE}</h2>
        <p className="muted">Bộ tài liệu ôn thi: trắc nghiệm kiến thức & tiếng Anh, bài mẫu thuyết trình.</p>
        <div className="chips">
          {CONTEST_SETS.map((c) => (
            <button
              key={c.id}
              className={`chip ${c.id === set.id ? 'selected' : ''}`}
              onClick={() => onSelectSet(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="tabs">
          <button className={tab === 'quiz' ? 'selected' : ''} onClick={() => setTab('quiz')}>
            📝 Trắc nghiệm ({total} câu)
          </button>
          <button className={tab === 'speech' ? 'selected' : ''} onClick={() => setTab('speech')}>
            🎤 Bài thuyết trình
          </button>
        </div>
      </section>

      {/* key: đổi bộ đề thì làm lại từ đầu */}
      {tab === 'quiz' ? (
        <ContestQuiz key={set.id} set={set} />
      ) : (
        <Speech key={set.id} speech={set.speech} tips={set.tips} />
      )}
    </>
  );
}
