package com.ssafy.domain.Member.dto.response;

import com.ssafy.config.security.jwt.TokenInfo;
import com.ssafy.domain.Member.entity.TeeBox;
import io.swagger.v3.oas.annotations.media.Schema;

public record SignInResponse(
        @Schema(description = "회원 아이디", example = "ssafy1234@ssafy.com")
        String id,
        @Schema(description = "회원 닉네임", example = "김싸피")
        String nickname,
        @Schema(description = "회원 레벨", example = "보기 플레이어")
        String level,
        @Schema(description = "회원 티박스", example = "RED")
        TeeBox teeBox,
        TokenInfo token
) {
}
