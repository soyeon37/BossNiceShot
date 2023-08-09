package com.ssafy.domain.notification.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record NotificationResponse(
        @Schema(description = "결과 메시지")
        String resultMessage
){
}
