package com.ssafy.domain.Notification.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record CreateCoachingNotificationRequest(
        @Schema(description = "코칭글 알림 수신자")
        String memberId,
        @Schema(description = "코칭글 알림 발신자")
        String followee,
        @Schema(description = "코칭글 id")
        Long coachingId
) {
}
