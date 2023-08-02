package com.ssafy.domain.follow.dto.request;

import jakarta.validation.constraints.NotNull;

public record FollowRequest(@NotNull String followeeId) {
}
