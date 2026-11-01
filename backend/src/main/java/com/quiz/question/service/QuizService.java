package com.quiz.question.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.quiz.question.dto.QuizDtos.Answer;
import com.quiz.question.dto.QuizDtos.CategoryInfo;
import com.quiz.question.dto.QuizDtos.QuestionResult;
import com.quiz.question.dto.QuizDtos.QuestionView;
import com.quiz.question.dto.QuizDtos.SubmitResponse;
import com.quiz.question.domain.Category;
import com.quiz.question.domain.Question;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class QuizService {

    private final List<Question> questions;
    private final Map<Integer, Question> questionsById;

    public QuizService(ObjectMapper objectMapper) throws IOException {
        try (InputStream in = new ClassPathResource("questions.json").getInputStream()) {
            this.questions = List.copyOf(objectMapper.readValue(in, new TypeReference<List<Question>>() {
            }));
        }
        this.questionsById = questions.stream()
                .collect(Collectors.toMap(Question::id, Function.identity(), (a, b) -> a, LinkedHashMap::new));
    }

    public List<CategoryInfo> categories() {
        Map<Category, Long> counts = questions.stream()
                .collect(Collectors.groupingBy(Question::category, Collectors.counting()));
        List<CategoryInfo> result = new ArrayList<>();
        for (Category c : Category.values()) {
            result.add(new CategoryInfo(c, c.getEnglish(), c.getVietnamese(), counts.getOrDefault(c, 0L)));
        }
        return result;
    }

    /**
     * @param category null for all categories
     * @param limit    0 or negative for no limit
     */
    public List<QuestionView> questions(Category category, boolean shuffle, int limit) {
        List<Question> selected = new ArrayList<>(questions.stream()
                .filter(q -> category == null || q.category() == category)
                .toList());
        if (shuffle) {
            Collections.shuffle(selected);
        }
        if (limit > 0 && limit < selected.size()) {
            selected = selected.subList(0, limit);
        }
        return selected.stream()
                .map(q -> new QuestionView(q.id(), q.category(), q.question(), q.options()))
                .toList();
    }

    public SubmitResponse grade(List<Answer> answers) {
        List<QuestionResult> results = new ArrayList<>();
        int correct = 0;
        for (Answer answer : answers) {
            Question q = questionsById.get(answer.questionId());
            if (q == null) {
                continue;
            }
            Integer chosen = answer.chosen() != null && answer.chosen() >= 0 ? answer.chosen() : null;
            boolean ok = chosen != null && chosen == q.answer();
            if (ok) {
                correct++;
            }
            results.add(new QuestionResult(q.id(), q.category(), q.question(), q.options(),
                    chosen, q.answer(), ok, q.explanation()));
        }
        int total = results.size();
        double percent = total == 0 ? 0 : Math.round(correct * 1000.0 / total) / 10.0;
        return new SubmitResponse(total, correct, percent, results);
    }
}
