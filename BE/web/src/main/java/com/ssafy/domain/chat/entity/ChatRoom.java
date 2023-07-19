package com.ssafy.domain.chat.entity;

import com.ssafy.audit.BaseTime;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
public class ChatRoom extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private String roomName;

    public ChatRoom(String roomName) {
        this.roomName = roomName;
    }
}
