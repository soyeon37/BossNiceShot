package com.ssafy.domain.chat.entity;

import com.ssafy.audit.BaseTime;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Getter
@Document(collation = "chat_message")
@NoArgsConstructor
public class ChatMessage extends BaseTime {
    @Id
    @Field(value="_id", targetType = FieldType.OBJECT_ID)
    private String id;

    @Field("messageType")
    private MessageType messageType;

    @Field("message")
    private String message;

    @Field("member_id")
    private String memberId;

    @Field("chat_room_id")
    private Long chatRoomId;

    public ChatMessage(MessageType messageType, String message, String memberId, Long chatRoomId) {
        this.messageType = messageType;
        this.message = message;
        this.memberId = memberId;
        this.chatRoomId = chatRoomId;
    }
}
