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

    @Column(columnDefinition = "datetime", nullable = false)
    private LocalDateTime teeUpTime;

    @Column(columnDefinition = "datetime", nullable = false)
    private LocalDateTime applicationDeadline;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "companion", cascade = CascadeType.ALL)
    private List<CompanionUser> companionUsers = new ArrayList<>();

    @Builder
    public Companion(String title, String description, Integer field, TeeBox teeBox, Integer capacity, LocalDateTime teeUpTime, LocalDateTime applicationDeadline, Member member) {
        this.title = title;
        this.description = description;
        this.field = field;
        this.teeBox = teeBox;
        this.capacity = capacity;
        this.teeUpTime = teeUpTime;
        this.applicationDeadline = applicationDeadline;
        this.member = member;
    }

    public void update(String title, String description, Integer field, TeeBox teeBox, Integer capacity, LocalDateTime teeUpTime, LocalDateTime applicationDeadline){
        this.title = title;
        this.description = description;
        this.field = field;
        this.teeBox = teeBox;
        this.capacity = capacity;
        this.teeUpTime = teeUpTime;
        this.applicationDeadline = applicationDeadline;
    }
}
