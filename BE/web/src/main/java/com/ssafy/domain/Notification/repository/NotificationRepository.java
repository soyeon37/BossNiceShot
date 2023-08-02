package com.ssafy.domain.Notification.repository;

import com.ssafy.domain.Notification.entity.NotificationCoaching;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<NotificationCoaching, Long> {
}
