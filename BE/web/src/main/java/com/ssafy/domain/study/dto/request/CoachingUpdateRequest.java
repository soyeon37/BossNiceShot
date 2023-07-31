package com.ssafy.domain.study.dto.request;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record CoachingUpdateRequest(@NotNull String title,
                                    @NotNull String description,
                                    Integer password,
                                    @NotNull LocalDateTime reservedTime,
                                    @NotNull Integer capacity) {
}
