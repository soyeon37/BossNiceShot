package com.ssafy.domain.Companion.dto.request;

import com.ssafy.common.TeeBox;
import jakarta.validation.constraints.NotNull;

public record CompanionSearch(@NotNull String category,
							  @NotNull String keyword) {
}
