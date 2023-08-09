package com.ssafy.domain.member.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record SignInRequest(
        @Schema(description = "회원 아이디", example = "ssafy1234@ssafy.com")
        String id,
        @Schema(description = "회원 비밀번호", example = "1234")
        String password,
        @Schema(description = "카카오 로그인 여부", example = "true")
        Boolean isKakao
) {
}
