package com.ssafy.domain.notification.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record NotificationRequest(
        @Schema(description = "알림 id")
        String id,
        @Schema(description = "알림 유형")
        String type,
        @Schema(description = "알림 수신자")
        String recipient,
        @Schema(description = "알림 수신자 닉네임")
        String recipientNickname,
        @Schema(description = "알림 발신자")
        String sender,
        @Schema(description = "알림 발신자 닉네임")
        String senderNickname,
        @Schema(description = "글 인덱스")
        Long articleId,
        @Schema(description = "글 제목")
        String title,
        @Schema(description = "신청 상태")
        String status,
        @Schema(description = "알림 read 여부")
        Boolean read
) {
}
