package com.ssafy.domain.Notification.controller;

import com.ssafy.common.api.ApiResponse;
import com.ssafy.domain.Notification.dto.request.CreateCoachingNotificationRequest;
import com.ssafy.domain.Notification.dto.response.CreateCoachingNotificationResponse;
import com.ssafy.domain.Notification.service.NotificationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "Notification API")
@RestController
@RequestMapping("/notification")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;
    // 알림 목록 가져오기
    // 알림 삭제
    // 알림 읽기
    // 알림 업데이트
    // 알림 생성
    @PostMapping("/createCoaching")
    public ApiResponse createCoachingNotification (@RequestBody CreateCoachingNotificationRequest request){
        return ApiResponse.success(notificationService.createCoachingNotification(request));
    }
}
