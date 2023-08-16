package com.ssafy.domain.companion.dto.request;

import com.ssafy.common.TeeBox;
import jakarta.validation.constraints.NotNull;

public record CompanionUpdateRequest(@NotNull String title,
									 @NotNull String description,
									 @NotNull Integer field,
									 @NotNull TeeBox teeBox,
									 @NotNull Integer capacity,
									 @NotNull String teeUpTime) {
}
