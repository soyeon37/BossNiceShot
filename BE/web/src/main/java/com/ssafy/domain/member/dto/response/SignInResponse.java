package com.ssafy.domain.member.dto.response;

import com.ssafy.config.security.jwt.TokenInfo;
import io.swagger.v3.oas.annotations.media.Schema;

public record SignInResponse(
        @Schema(description = "회원 아이디", example = "ssafy1234@ssafy.com")
        String id,
        TokenInfo token
) {
}
