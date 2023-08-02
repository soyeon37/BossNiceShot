package com.ssafy.domain.Notification.dto.response;

import com.ssafy.domain.Notification.entity.Notification;

import java.util.List;

public record NotificationListRespones(
        List<Notification> NotificationList
) {
}
