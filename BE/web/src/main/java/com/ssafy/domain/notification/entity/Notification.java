package com.ssafy.domain.notification.entity;

import com.ssafy.audit.BaseTime;
import com.ssafy.domain.notification.dto.request.NotificationRequest;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Getter
@Builder
@Document
public class Notification extends BaseTime {
    @Field(value="_id", targetType = FieldType.OBJECT_ID)
    private String id;
    private String type;
    private String recipient;
    private String recipientNickname;
    private String sender;
    private String senderNickname;
    private Long articleId;
    private String title;
    private String status;
    private Boolean read;


    public static Notification from(NotificationRequest request, String recipient, String recipientNickname){
        return Notification.builder()
                .type(request.type())
                .recipient(recipient)
                .recipientNickname(recipientNickname)
                .sender(request.sender())
                .senderNickname(request.senderNickname())
                .articleId(request.articleId())
                .title(request.title())
                .status(request.status())
                .read(request.read())
                .build();
    }
}



