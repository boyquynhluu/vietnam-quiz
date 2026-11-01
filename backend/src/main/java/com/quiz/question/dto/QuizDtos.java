package com.quiz.question.dto;

import com.quiz.question.domain.Category;
import jakarta.validation.constraints.NotNull;

import java.util.List;

/** Request/response shapes for the quiz API. The correct answer is never sent before submit. */
public final class QuizDtos {

    private QuizDtos() {
    }

    public record CategoryInfo(Category code, String english, String vietnamese, long count) {
    }

    public record QuestionView(int id, Category category, String question, List<String> options) {
    }

    /** chosen: option index, or null / -1 when skipped. */
    public record Answer(int questionId, Integer chosen) {
    }

    /** answers in the order the questions were shown, so the review keeps that order. */
    public record SubmitRequest(@NotNull List<Answer> answers) {
    }

    public record QuestionResult(
            int id,
            Category category,
            String question,
            List<String> options,
            Integer chosen,
            int correct,
            boolean isCorrect,
            String explanation) {
    }

    public record SubmitResponse(int total, int correct, double percent, List<QuestionResult> results) {
    }
}
