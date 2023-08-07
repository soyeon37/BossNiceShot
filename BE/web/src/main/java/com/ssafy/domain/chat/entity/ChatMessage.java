package com.ssafy.domain.chat.entity;

import com.ssafy.audit.BaseTime;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Getter
@Document(collection = "chat_message")
@NoArgsConstructor
public class ChatMessage extends BaseTime {
    @Id
    @Field(value="_id", targetType = FieldType.OBJECT_ID)
    private String id;

    @Field("type")
    private MessageType type;

    @Field("content")
    private String content;

    @Field("member_id")
    private String memberId;

    @Field("member_nickname")
    private String memberNickname;

    @Field("chat_room_id")
    private Long chatRoomId;

    public ChatMessage(MessageType type, String content, String memberId, String memberNickname, Long chatRoomId) {
        this.type = type;
        this.content = content;
        this.memberId = memberId;
        this.memberNickname = memberNickname;
        this.chatRoomId = chatRoomId;
    }

    @Override
    public String toString() {
        return "ChatMessage{" +
                "id='" + id + '\'' +
                ", type=" + type +
                ", content='" + content + '\'' +
                ", memberId='" + memberId + '\'' +
                ", memberNickname='" + memberNickname + '\'' +
                ", chatRoomId=" + chatRoomId +
                '}';
    }
}
