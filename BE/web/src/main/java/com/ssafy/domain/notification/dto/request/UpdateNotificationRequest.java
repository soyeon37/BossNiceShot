package com.ssafy.domain.notification.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record UpdateNotificationRequest(
        @Schema(description = "알림 수신자")
        String recipient
) {
}
