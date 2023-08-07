package com.ssafy.domain.chat.entity;

import com.ssafy.audit.BaseTime;
import com.ssafy.domain.Member.entity.Member;
import com.ssafy.domain.Member.entity.TeeBox;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoom extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false,  length = 50)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT", length = 300)
    private String description;

    @Column(nullable = false)
    private int field;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TeeBox teeBox;

    @Column(nullable = false)
    private int capacity;

    @Column(columnDefinition = "datetime", nullable = false)
    private LocalDateTime teeUpTime;

    @Column(columnDefinition = "datetime", nullable = false)
    private LocalDateTime applicationDeadline;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public ChatRoom(String title, String description, int field, TeeBox teeBox, int capacity, LocalDateTime teeUpTime, LocalDateTime applicationDeadline, Member member) {
        this.title = title;
        this.description = description;
        this.field = field;
        this.teeBox = teeBox;
        this.capacity = capacity;
        this.teeUpTime = teeUpTime;
        this.applicationDeadline = applicationDeadline;
        this.member = member;
    }

    public void update(String title, String description, int field, TeeBox teeBox, int capacity, LocalDateTime teeUpTime, LocalDateTime applicationDeadline) {
        this.title = title;
        this.description = description;
        this.field = field;
        this.teeBox = teeBox;
        this.capacity = capacity;
        this.teeUpTime = teeUpTime;
        this.applicationDeadline = applicationDeadline;
    }
}
