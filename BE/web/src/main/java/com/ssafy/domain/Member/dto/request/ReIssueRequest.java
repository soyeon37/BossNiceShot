package com.ssafy.domain.Member.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record ReIssueRequest(
        @Schema(description = "REFRESH TOKEN")
        String refreshToken
) {
}
