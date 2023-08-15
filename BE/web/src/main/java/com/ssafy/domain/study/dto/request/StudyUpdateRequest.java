package com.ssafy.domain.study.dto.request;

import jakarta.validation.constraints.NotNull;

public record StudyUpdateRequest(@NotNull String title,
                                 @NotNull String description,
                                 @NotNull String reservedTime,
                                 @NotNull Integer capacity,
                                 @NotNull Boolean locked,
                                 @NotNull Integer password) {
}