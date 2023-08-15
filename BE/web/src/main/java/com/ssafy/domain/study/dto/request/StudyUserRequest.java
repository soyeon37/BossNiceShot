package com.ssafy.domain.study.dto.request;

import jakarta.validation.constraints.NotNull;

public record StudyUserRequest(@NotNull Long studyId) {
}
