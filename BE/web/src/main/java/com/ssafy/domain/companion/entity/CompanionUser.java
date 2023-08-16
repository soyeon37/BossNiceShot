package com.ssafy.domain.companion.entity;

import com.ssafy.common.Status;
import com.ssafy.domain.member.entity.Member;
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
    @Column(nullable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "companion_id")
    private Companion companion;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public CompanionUser(Member member, Companion companion) {
        status = Status.INACTIVE;
        this.member = member;
        this.companion = companion;
    }

    public void active() {
        this.status = Status.ACTIVE;
    }
}
