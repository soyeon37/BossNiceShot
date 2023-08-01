package com.ssafy.domain.Notification.service;

import com.ssafy.domain.Notification.dto.request.CreateCoachingNotificationRequest;
import com.ssafy.domain.Notification.dto.response.CreateCoachingNotificationResponse;
import com.ssafy.domain.follow.entity.Follow;
import com.ssafy.domain.follow.repository.FollowRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class NotificationService {
    private final FollowRepository followRepository;
    public CreateCoachingNotificationResponse createCoachingNotification(CreateCoachingNotificationRequest request){
        // 알림 창에 띄울 데이터 가져오기
        List<Follow> list = followRepository.findByFolloweeId(request.followee());
        log.info(list.toString());
        return new CreateCoachingNotificationResponse("");
    }
}
