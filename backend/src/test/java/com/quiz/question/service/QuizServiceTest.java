package com.quiz.question.service;

import com.quiz.question.dto.QuizDtos.Answer;
import com.quiz.question.dto.QuizDtos.QuestionResult;
import com.quiz.question.dto.QuizDtos.SubmitResponse;
import com.quiz.question.domain.Category;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class QuizServiceTest {

    @Autowired
    QuizService quizService;

    @Test
    void loadsAllFortyQuestions() {
        assertThat(quizService.questions(null, false, 0)).hasSize(40);
        assertThat(quizService.questions(Category.NATURE, true, 0)).hasSize(10);
        assertThat(quizService.questions(null, true, 5)).hasSize(5);
    }

    @Test
    void gradesAnswers() {
        // Q1 correct = 1, Q2 correct = 1, Q3 correct = 0
        SubmitResponse r = quizService.grade(List.of(new Answer(3, -1), new Answer(1, 1), new Answer(2, 0)));
        assertThat(r.total()).isEqualTo(3);
        assertThat(r.correct()).isEqualTo(1);
        assertThat(r.results()).extracting(QuestionResult::id).containsExactly(3, 1, 2);
    }
}
