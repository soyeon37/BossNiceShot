package com.ssafy.domain.study.dto.response;

import com.ssafy.domain.study.entity.Learning;
import jakarta.validation.constraints.NotNull;

public record LearningResponse(@NotNull Long id,
                               @NotNull String title,
                               @NotNull String description,
                               Integer password,
                               @NotNull String learnerId,
                               @NotNull String learnerNickname) {
    public static LearningResponse from(Learning learning) {
        return new LearningResponse(
                learning.getId(),
                learning.getTitle(),
                learning.getDescription(),
                learning.getPassword(),
                learning.getMember().getId(),
                learning.getMember().getNickname()
        );
    }
}