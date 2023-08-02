package com.ssafy.domain.Notification.controller;

import com.ssafy.common.api.ApiResponse;
import com.ssafy.domain.Notification.dto.request.NotificationRequest;
import com.ssafy.domain.Notification.dto.request.UpdateNotificationRequest;
import com.ssafy.domain.Notification.service.NotificationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Tag(name = "Notification API")
@RestController
@RequestMapping("/notification")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;
    // 알림 목록 가져오기
    @GetMapping("/read")
    public ApiResponse readNotificationList(@RequestBody NotificationRequest request){
        log.info("알림 리스트 조회");
        return ApiResponse.success(notificationService.read(request));
    }
    // 알림 전체 삭제
    @DeleteMapping("/deleteAll")
    public ApiResponse deleteAllNotification(@RequestBody NotificationRequest request){
        log.info("알림 전체 삭제");
        return ApiResponse.success(notificationService.deleteAll(request));
    }

    // 알림 삭제
    @DeleteMapping("/delete")
    public ApiResponse deleteNotification(@RequestBody NotificationRequest request){
        log.info("알림 삭제");
        return ApiResponse.success(notificationService.delete(request));
    }
    // 알림 생성
    @PostMapping("/create")
    public ApiResponse createNotification (@RequestBody NotificationRequest request){
        log.info("알림 생성 시작");
        return ApiResponse.success(notificationService.create(request));
    }

    // 알림 업데이트
    @PutMapping("/update")
    public ApiResponse updateNotification(@RequestBody UpdateNotificationRequest request){
        log.info("알림 업데이트 시작");
        return ApiResponse.success(notificationService.update(request));
    }
}
