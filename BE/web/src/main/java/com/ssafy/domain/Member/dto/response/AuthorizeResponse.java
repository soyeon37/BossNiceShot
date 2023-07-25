package com.ssafy.domain.Member.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record AuthorizeResponse (
        @Schema(description = "토큰 권한 부여 유형",example = "Bearer")
        String grantType,
        @Schema(description = "AccessToken",example = "")
        String accessToken,
        @Schema(description="ReIssue Status Message", example = "INVALID_REFRESH_TOKEN")
        String message
        )
{
        public static AuthorizeResponse from(String accessToken, String message){
                return new AuthorizeResponse(
                        "Bearer",
                        accessToken,
                        message
                );
        }
}
