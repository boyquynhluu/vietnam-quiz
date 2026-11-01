import { useEffect, useState } from 'react';
import { getQuestions, submitAnswers } from '../api/quizApi.js';

const LETTERS = ['A', 'B', 'C', 'D'];

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

export default function Quiz({ settings, onFinish, onQuit }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getQuestions(settings)
      .then(setQuestions)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [settings]);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading) return <section className="card">Đang tải câu hỏi…</section>;
  if (error) return <section className="card error">{error}</section>;
  if (questions.length === 0) return <section className="card">Không có câu hỏi.</section>;

  const q = questions[index];
  const answeredCount = Object.keys(answers).length;
  const isLast = index === questions.length - 1;

  const choose = (optionIndex) => setAnswers((a) => ({ ...a, [q.id]: optionIndex }));

  const submit = async () => {
    const unanswered = questions.length - answeredCount;
    if (unanswered > 0 && !window.confirm(`Còn ${unanswered} câu chưa trả lời. Nộp bài luôn?`)) {
      return;
    }
    setSubmitting(true);
    try {
      // Send every question in display order; unanswered ones are -1
      const payload = questions.map((item) => ({ questionId: item.id, chosen: answers[item.id] ?? -1 }));
      const result = await submitAnswers(payload);
      onFinish({ ...result, seconds });
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="card">
      <div className="quiz-head">
        <span>
          Question <strong>{index + 1}</strong> / {questions.length}
        </span>
        <span className="timer">⏱ {formatTime(seconds)}</span>
      </div>
      <div className="progress">
        <div style={{ width: `${(answeredCount / questions.length) * 100}%` }} />
      </div>

      <h2 className="question">{q.question}</h2>

      <div className="options">
        {q.options.map((opt, i) => (
          <button
            key={i}
            className={`option ${answers[q.id] === i ? 'selected' : ''}`}
            onClick={() => choose(i)}
          >
            <span className="letter">{LETTERS[i]}</span>
            <span>{opt}</span>
          </button>
        ))}
      </div>

      <div className="nav">
        <button disabled={index === 0} onClick={() => setIndex(index - 1)}>
          ← Trước
        </button>
        {isLast ? (
          <button className="primary" disabled={submitting} onClick={submit}>
            {submitting ? 'Đang chấm…' : 'Nộp bài ✓'}
          </button>
        ) : (
          <button className="primary" onClick={() => setIndex(index + 1)}>
            Tiếp →
          </button>
        )}
      </div>

      <div className="dots">
        {questions.map((item, i) => (
          <button
            key={item.id}
            className={`dot ${i === index ? 'current' : ''} ${answers[item.id] !== undefined ? 'done' : ''}`}
            onClick={() => setIndex(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="footer-actions">
        <button className="link" onClick={onQuit}>
          Thoát
        </button>
        {!isLast && (
          <button className="link" disabled={submitting} onClick={submit}>
            Nộp bài sớm
          </button>
        )}
      </div>
    </section>
  );
}
