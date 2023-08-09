package com.ssafy.domain.notification.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record DeleteNotificationRequest(
        @Schema(description = "Notification 인덱스")
        String id
) {
}
