package com.ssafy.domain.study.dto.request;

import com.ssafy.domain.Member.entity.Member;
import com.ssafy.domain.study.entity.Learning;
import jakarta.validation.constraints.NotNull;

public record LearningCreateRequest(@NotNull String title,
                                   @NotNull String description,
                                   @NotNull Integer password) {
    public Learning toLearning(Member member) {
        return new Learning(title, description, password, member);
    }
}
