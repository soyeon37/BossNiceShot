package com.ssafy.domain.notification.controller;

import com.ssafy.common.api.ApiResponse;
import com.ssafy.domain.notification.dto.request.DeleteNotificationRequest;
import com.ssafy.domain.notification.dto.request.NotificationRequest;
import com.ssafy.domain.notification.service.NotificationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Slf4j
@Tag(name = "Notification API")
@RestController
@RequestMapping("/api/notification")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;
    // 알림 목록 가져오기
    @GetMapping("/read")
    public ApiResponse readNotificationList(Principal principal){
        log.info("알림 리스트 조회");
        String recipient = principal.getName();
        log.info("recipient={}", recipient);
        return ApiResponse.success(notificationService.read(recipient));
    }

    // 알림 읽음 여부 가져오기
    @GetMapping("/check")
    public ApiResponse check(Principal principal){
        log.info("알림 읽음 여부 확인 시작");
        String recipient = principal.getName();
        log.info("recipient={}", recipient);
        return ApiResponse.success(notificationService.check(recipient));
    }

    // 알림 전체 삭제
    @DeleteMapping("/deleteAll")
    public ApiResponse deleteAllNotification(Principal principal){
        log.info("알림 전체 삭제");
        String recipient = principal.getName();
        log.info("recipient={}", recipient);
        return ApiResponse.success(notificationService.deleteAll(recipient));
    }

    // 알림 삭제
    @DeleteMapping("/delete/{id}")
    public ApiResponse deleteNotification(@PathVariable String id){
        log.info("알림 삭제");
        return ApiResponse.success(notificationService.delete(id));
    }

    // 알림 생성
    @PostMapping("/create")
    public ApiResponse createNotification (@RequestBody NotificationRequest request){
        log.info("알림 생성 시작");
        return ApiResponse.success(notificationService.create(request));
    }

    // 알림 업데이트
    @PutMapping("/update")
    public ApiResponse updateNotification(Principal principal){
        log.info("알림 업데이트 시작");
        String recipient = principal.getName();
        log.info("recipient={}", recipient);
        return ApiResponse.success(notificationService.update(recipient));
    }
}
