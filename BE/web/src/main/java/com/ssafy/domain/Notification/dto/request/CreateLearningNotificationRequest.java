package com.ssafy.domain.Notification.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record CreateLearningNotificationRequest(
        @Schema(description = "러닝글 알림 수신자")
        String memberId,
        @Schema(description = "러닝글 알림 발신자")
        String followee,
        @Schema(description = "러닝글 id")
        Long learningId
) {
}
