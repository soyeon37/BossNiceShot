package com.ssafy.domain.chat.entity;

import com.ssafy.audit.BaseTime;
import com.ssafy.domain.Member.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
public class ChatMessage extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id", nullable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    private MessageType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false)
    private String message;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private ChatRoom chatRoom;

    public ChatMessage(MessageType type, Member member, String message, ChatRoom chatRoom) {
        this.type = type;
        this.member = member;
        this.message = message;
        this.chatRoom = chatRoom;
    }
}
