package com.ssafy.domain.member.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record UpdatePasswordResponse(
        @Schema(description = "결과 메시지")
        String resultMessage
) {
}
