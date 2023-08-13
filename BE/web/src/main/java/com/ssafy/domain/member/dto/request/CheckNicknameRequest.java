package com.ssafy.domain.member.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record CheckNicknameRequest(
        @Schema(description = "닉네임", example = "김싸피")
        String nickname
) {
}
