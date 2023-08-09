package com.ssafy.domain.notification.repository;

import com.ssafy.domain.notification.entity.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, Long> {
}
