package com.ssafy.domain.companion.entity;

import com.ssafy.audit.BaseTime;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Getter
@Document(collection = "companion_chat")
@NoArgsConstructor
public class CompanionChat extends BaseTime {
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

    @Field("member_image")
    private String memberImage;

    @Field("companion_id")
    private Long companionId;

    public CompanionChat(MessageType type, String content, String memberId, String memberNickname, String memberImage, Long companionId) {
        this.type = type;
        this.content = content;
        this.memberId = memberId;
        this.memberNickname = memberNickname;
        this.memberImage = memberImage;
        this.companionId = companionId;
    }
}
