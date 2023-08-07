package com.ssafy.domain.Companion.dto.request;

import jakarta.validation.constraints.NotNull;

public record CompanionUserRequest(@NotNull Long companionId,
                                   @NotNull String memberId) {

}
