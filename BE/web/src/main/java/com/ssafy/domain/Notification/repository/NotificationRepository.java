package com.ssafy.domain.Notification.repository;

import com.ssafy.domain.Notification.entity.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, Long> {
}
