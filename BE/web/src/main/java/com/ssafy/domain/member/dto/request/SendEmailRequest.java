package com.ssafy.domain.member.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record SendEmailRequest(
        @Schema(description = "회원 아이디", example = "soyeun3377@naver.com")
        String id
) {
}
