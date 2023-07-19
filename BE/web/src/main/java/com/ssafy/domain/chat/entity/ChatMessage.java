package com.ssafy.domain.chat.entity;

import com.ssafy.audit.BaseTime;
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

    @Column(nullable = false)
    private String sender; // 추후에 Member로 변경

    @Column(nullable = false)
    private String message;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private ChatRoom chatRoom;

    public ChatMessage(String sender, String message, ChatRoom chatRoom) {
        this.sender = sender;
        this.message = message;
        this.chatRoom = chatRoom;
    }
}
