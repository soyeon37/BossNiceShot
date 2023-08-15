package com.ssafy.domain.member.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record UpdatePasswordRequest(
        @Schema(description = "기존 비밀번호")
        String passOrigin,

        @Schema(description = "새로운 비밀번호")
        String passNew
) {
}
