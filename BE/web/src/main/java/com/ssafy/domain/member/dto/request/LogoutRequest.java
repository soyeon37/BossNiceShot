package com.ssafy.domain.member.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record LogoutRequest (
        @Schema(description = "refresh token")
        String refreshToken
){
}
