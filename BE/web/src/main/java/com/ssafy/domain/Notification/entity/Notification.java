package com.ssafy.domain.Notification.entity;

import com.ssafy.audit.BaseTime;
import com.ssafy.domain.Notification.dto.request.NotificationRequest;
import jakarta.persistence.Id;
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
    private String sender;
    private Long articleId;
    private String status;
    private Boolean read;


    public static Notification from(NotificationRequest request, String recipient){
        return Notification.builder()
                .type(request.type())
                .recipient(recipient)
                .sender(request.sender())
                .articleId(request.articleId())
                .status(request.status())
                .read(request.read())
                .build();
    }
}



