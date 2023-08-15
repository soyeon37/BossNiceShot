package com.ssafy.domain.member.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record CheckNicknameResponse(
        @Schema(description = "닉네임 중복 확인 여부", example = "SUCCESS")
        String resultMessage
) {
}
