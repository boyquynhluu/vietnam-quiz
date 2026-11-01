package com.quiz.question.domain;

import java.util.List;

/** A quiz question as stored in questions.json, including the correct answer. */
public record Question(
        int id,
        Category category,
        String question,
        List<String> options,
        int answer,
        String explanation) {
}
