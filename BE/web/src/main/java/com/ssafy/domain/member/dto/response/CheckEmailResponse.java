package com.ssafy.domain.member.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record CheckEmailResponse(
        @Schema(description = "이메일 중복 확인 여부", example = "SUCCESS")
        String resultMessage
) {
}
