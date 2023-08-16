package com.ssafy.domain.member.dto.response;

import com.ssafy.common.TeeBox;
import com.ssafy.config.security.jwt.TokenInfo;
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
        @Schema(description = "회원 프로필 이미지", example = "red_hat_tiger.jpg")
        String image,
        TokenInfo token
) {
}
