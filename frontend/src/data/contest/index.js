// Các bộ đề ôn thi "Thiếu nhi Việt Nam – Vươn ra thế giới" (nguồn: docs/*.markdown).
// Mỗi bộ: { id, name, topics, speech, tips }
//   topics: [{ id, english, vietnamese, questions: [{ question, options, answer (0 = A), explanation }] }]
//   speech: { english, vietnamese, sections: [{ en, vi, english: [đoạn], vietnamese: [đoạn] }] }
//   tips:   [{ icon, title, text }] (có thể rỗng)
// Trong đoạn văn: **chữ đậm**, [chỗ cần điền]. Thêm bộ mới: tạo deN.js rồi thêm vào CONTEST_SETS.
import de1 from './de1.js';
import de2 from './de2.js';

export const TITLE = 'Thiếu nhi Việt Nam – Vươn ra thế giới';

export const CONTEST_SETS = [de1, de2];

// Dùng chung màn hình Quiz / Result với quiz chính: cùng định dạng QuestionView / SubmitResponse của backend.
// id duy nhất giữa các bộ: setId * 1000 + số thứ tự câu trong bộ.
const QUESTIONS_BY_ID = new Map();
for (const set of CONTEST_SETS) {
  let n = 0;
  set.topics.forEach((topic, topicIndex) =>
    topic.questions.forEach((q) => {
      n += 1;
      QUESTIONS_BY_ID.set(set.id * 1000 + n, { ...q, id: set.id * 1000 + n, setId: set.id, topicIndex });
    })
  );
}

/** settings: { setId, topicIndex } (topicIndex null = cả bộ). Giữ thứ tự như trong tài liệu. */
export function loadContestQuestions({ setId, topicIndex }) {
  const questions = [...QUESTIONS_BY_ID.values()]
    .filter((q) => q.setId === setId && (topicIndex === null || q.topicIndex === topicIndex))
    .map(({ id, question, options }) => ({ id, question, options }));
  return Promise.resolve(questions);
}

/** answers: [{ questionId, chosen }] theo thứ tự hiển thị; chosen = -1 khi bỏ qua (giống QuizService.grade). */
export function gradeContestAnswers(answers) {
  const results = answers
    .filter((a) => QUESTIONS_BY_ID.has(a.questionId))
    .map((a) => {
      const q = QUESTIONS_BY_ID.get(a.questionId);
      const chosen = a.chosen >= 0 ? a.chosen : null;
      return {
        id: q.id,
        question: q.question,
        options: q.options,
        chosen,
        correct: q.answer,
        isCorrect: chosen === q.answer,
        explanation: q.explanation,
      };
    });
  const correct = results.filter((r) => r.isCorrect).length;
  const total = results.length;
  const percent = total === 0 ? 0 : Math.round((correct * 1000) / total) / 10;
  return Promise.resolve({ total, correct, percent, results });
}
