import { useState } from 'react';

const LETTERS = ['A', 'B', 'C', 'D'];

function message(percent) {
  if (percent === 100) return 'Excellent! Hoàn hảo! 🏆';
  if (percent >= 80) return 'Great job! Rất giỏi! 🎉';
  if (percent >= 50) return 'Good! Cố gắng thêm nhé! 💪';
  return 'Keep practicing! Ôn lại và thử lần nữa nhé! 📚';
}

export default function Result({ result, onRetry, onHome }) {
  const [onlyWrong, setOnlyWrong] = useState(false);
  const minutes = Math.floor(result.seconds / 60);
  const secs = result.seconds % 60;
  const shown = onlyWrong ? result.results.filter((r) => !r.isCorrect) : result.results;

  return (
    <>
      <section className="card score-card">
        <div className="score">
          {result.correct}/{result.total}
        </div>
        <div className="percent">{result.percent}%</div>
        <p>{message(result.percent)}</p>
        <p className="muted">
          Thời gian: {minutes} phút {secs} giây
        </p>
        <div className="nav">
          <button onClick={onHome}>Trang chủ</button>
          <button className="primary" onClick={onRetry}>
            Làm lại
          </button>
        </div>
      </section>

      <section className="card">
        <div className="review-head">
          <h2>Xem lại đáp án</h2>
          <label>
            <input type="checkbox" checked={onlyWrong} onChange={(e) => setOnlyWrong(e.target.checked)} /> Chỉ câu sai
          </label>
        </div>

        {shown.map((r, n) => (
          <div key={r.id} className={`review ${r.isCorrect ? 'ok' : 'bad'}`}>
            <p className="review-q">
              {r.isCorrect ? '✅' : '❌'} {n + 1}. {r.question}
            </p>
            <ul>
              {r.options.map((opt, i) => (
                <li
                  key={i}
                  className={i === r.correct ? 'correct' : i === r.chosen ? 'wrong' : ''}
                >
                  {LETTERS[i]}. {opt}
                </li>
              ))}
            </ul>
            {r.chosen === null && <p className="muted">Bạn chưa trả lời câu này.</p>}
            <p className="explain">💡 {r.explanation}</p>
          </div>
        ))}
        {shown.length === 0 && <p>Không có câu sai nào. Tuyệt vời!</p>}
      </section>
    </>
  );
}
