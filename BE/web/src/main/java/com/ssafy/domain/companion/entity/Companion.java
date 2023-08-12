package com.ssafy.domain.companion.entity;

import com.ssafy.audit.BaseTime;
import com.ssafy.common.TeeBox;
import com.ssafy.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Companion extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false, length = 50)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT", length = 300)
    private String description;

    @Column(nullable = false)
    private Integer field;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TeeBox teeBox;

    @Column(nullable = false)
    private Integer capacity;

    @Column(nullable = false)
    private Integer companionUserCount;

    @Column(columnDefinition = "datetime", nullable = false)
    private LocalDateTime teeUpTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Companion(String title, String description, Integer field, TeeBox teeBox, Integer capacity, LocalDateTime teeUpTime, Member member) {
        this.title = title;
        this.description = description;
        this.field = field;
        this.teeBox = teeBox;
        this.capacity = capacity;
        companionUserCount = 0;
        this.teeUpTime = teeUpTime;
        this.member = member;
    }

    public void update(String title, String description, Integer field, TeeBox teeBox, Integer capacity, LocalDateTime teeUpTime){
        this.title = title;
        this.description = description;
        this.field = field;
        this.teeBox = teeBox;
        this.capacity = capacity;
        this.teeUpTime = teeUpTime;
    }

    public void acceptUser() {
        companionUserCount++;
    }

    public void leaveUser() {
        companionUserCount--;
    }
}
