package com.ssafy.domain.member.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record SendEmailResponse(
        @Schema(description = "인증번호",example ="dff34j2l34" )
        String certificationNum
) {
}
