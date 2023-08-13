package com.ssafy.domain.notification.dto.response;

import com.ssafy.domain.notification.entity.Notification;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public record NotificationListRespones(
        @Schema(description = "알림 리스트")
        List<Notification> NotificationList
) {
}
