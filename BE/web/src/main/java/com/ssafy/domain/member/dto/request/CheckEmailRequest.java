package com.ssafy.domain.member.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record CheckEmailRequest(
        @Schema(description = "이메일", example = "ssafy1234@ssafy.com")
        String id
) {
}
