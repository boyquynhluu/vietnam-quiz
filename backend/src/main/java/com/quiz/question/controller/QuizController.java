package com.quiz.question.controller;

import com.quiz.question.dto.QuizDtos.CategoryInfo;
import com.quiz.question.dto.QuizDtos.QuestionView;
import com.quiz.question.dto.QuizDtos.SubmitRequest;
import com.quiz.question.dto.QuizDtos.SubmitResponse;
import com.quiz.question.domain.Category;
import com.quiz.question.service.QuizService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/categories")
    public List<CategoryInfo> categories() {
        return quizService.categories();
    }

    @GetMapping("/questions")
    public List<QuestionView> questions(
            @RequestParam(required = false) Category category,
            @RequestParam(defaultValue = "true") boolean shuffle,
            @RequestParam(defaultValue = "0") int limit) {
        return quizService.questions(category, shuffle, limit);
    }

    @PostMapping("/submit")
    public SubmitResponse submit(@Valid @RequestBody SubmitRequest request) {
        return quizService.grade(request.answers());
    }
}
