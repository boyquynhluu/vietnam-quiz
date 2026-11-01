import { useEffect, useState } from 'react';
import { getCategories } from '../api/quizApi.js';

const ICONS = { HISTORY: '🏛️', CULTURE: '🎎', NATURE: '🌄', PEOPLE: '👥' };
const LIMITS = [
  { value: 10, label: '10 câu' },
  { value: 20, label: '20 câu' },
  { value: 0, label: 'Tất cả' },
];

export default function Home({ onStart }) {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [limit, setLimit] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories().then(setCategories).catch((e) => setError(e.message));
  }, []);

  const total = categories.reduce((sum, c) => sum + c.count, 0);

  return (
    <section className="card">
      <h2>Chọn chủ đề</h2>
      {error && <p className="error">{error} – hãy chắc chắn backend đang chạy ở cổng 8080.</p>}

      <div className="category-grid">
        <button
          className={`category ${category === null ? 'selected' : ''}`}
          onClick={() => setCategory(null)}
        >
          <span className="icon">🇻🇳</span>
          <strong>All topics</strong>
          <small>Tất cả · {total} câu</small>
        </button>
        {categories.map((c) => (
          <button
            key={c.code}
            className={`category ${category === c.code ? 'selected' : ''}`}
            onClick={() => setCategory(c.code)}
          >
            <span className="icon">{ICONS[c.code]}</span>
            <strong>{c.english}</strong>
            <small>
              {c.vietnamese} · {c.count} câu
            </small>
          </button>
        ))}
      </div>

      <h2>Số câu hỏi</h2>
      <div className="chips">
        {LIMITS.map((l) => (
          <button
            key={l.value}
            className={`chip ${limit === l.value ? 'selected' : ''}`}
            onClick={() => setLimit(l.value)}
          >
            {l.label}
          </button>
        ))}
      </div>

      <button className="primary big" disabled={!!error} onClick={() => onStart({ category, limit })}>
        Bắt đầu · Start
      </button>
    </section>
  );
}
