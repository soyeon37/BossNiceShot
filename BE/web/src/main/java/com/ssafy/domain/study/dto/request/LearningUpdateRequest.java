package com.ssafy.domain.study.dto.request;

import com.ssafy.domain.Member.entity.Member;
import com.ssafy.domain.study.entity.Learning;
import jakarta.validation.constraints.NotNull;

public record LearningUpdateRequest(@NotNull String title,
                                    @NotNull String description,
                                    @NotNull Integer password) {
}

