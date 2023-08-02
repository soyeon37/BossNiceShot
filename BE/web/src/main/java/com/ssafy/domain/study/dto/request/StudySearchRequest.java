package com.ssafy.domain.study.dto.request;

import jakarta.validation.constraints.NotNull;

public record StudySearchRequest(@NotNull String category,
                                 @NotNull String keyword) {
}
