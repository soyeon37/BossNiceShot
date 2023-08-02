package com.ssafy.domain.studyUser.dto.request;

import jakarta.validation.constraints.NotNull;

public record StudyUserRequest(@NotNull Long studyId) {
}
