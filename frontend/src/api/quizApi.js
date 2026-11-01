// Production gọi cùng domain (/api), nginx ngoài cùng chuyển sang backend; đặt VITE_API_BASE_URL khi tách domain
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function request(url, options) {
  const res = await fetch(BASE_URL + url, options);
  if (!res.ok) {
    throw new Error(`Lỗi ${res.status} khi gọi ${url}`);
  }
  return res.json();
}

export function getCategories() {
  return request('/api/categories');
}

export function getQuestions({ category, limit }) {
  const params = new URLSearchParams({ shuffle: 'true', limit: String(limit || 0) });
  if (category) params.set('category', category);
  return request(`/api/questions?${params}`);
}

/** answers: [{ questionId, chosen }] in display order; chosen = -1 when skipped */
export function submitAnswers(answers) {
  return request('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  });
}
