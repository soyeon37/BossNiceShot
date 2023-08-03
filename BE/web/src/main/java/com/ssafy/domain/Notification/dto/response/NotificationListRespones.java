package com.ssafy.domain.Notification.dto.response;

import com.ssafy.domain.Notification.entity.Notification;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public record NotificationListRespones(
        @Schema(description = "알림 리스트")
        List<Notification> NotificationList
) {
}
