package com.ssafy.domain.Member.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record SendEmailResponse(
        @Schema(description = "인증번호",example ="783478" )
        int certificationNum
) {
}
