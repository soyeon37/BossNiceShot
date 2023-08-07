package com.ssafy.domain.Companion.entity;

import com.ssafy.domain.Member.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CompanionUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING) // Enum 타입으로 지정
    @Column(nullable = false)
    private CompanionStatus companionStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "companion_id")
    private Companion companion;

    @Builder
    public CompanionUser(Member member, Companion companion) {
        companionStatus = CompanionStatus.INACTIVE; // 기본 상태를 INACTIVE로 설정
        this.member = member;
        this.companion = companion;
    }

    public void active() {
        this.companionStatus = CompanionStatus.ACTIVE;
    }

}
