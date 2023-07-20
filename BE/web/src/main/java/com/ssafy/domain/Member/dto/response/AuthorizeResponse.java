package com.ssafy.domain.Member.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record AuthorizeResponse (
        @Schema(description = "토큰 권한 부여 유형",example = "Bearer")
        String grantType,
        @Schema(description = "AccessToken",example = "")
        String accessToken

        )
{
        public static AuthorizeResponse from(String accessToken){
                return new AuthorizeResponse(
                        "Bearer",
                        accessToken
                );
        }
}
