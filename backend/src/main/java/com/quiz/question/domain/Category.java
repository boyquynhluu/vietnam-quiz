package com.quiz.question.domain;

public enum Category {
    HISTORY("History", "Lịch sử"),
    CULTURE("Culture", "Văn hóa"),
    NATURE("Nature", "Thiên nhiên"),
    PEOPLE("People", "Con người");

    private final String english;
    private final String vietnamese;

    Category(String english, String vietnamese) {
        this.english = english;
        this.vietnamese = vietnamese;
    }

    public String getEnglish() {
        return english;
    }

    public String getVietnamese() {
        return vietnamese;
    }
}
