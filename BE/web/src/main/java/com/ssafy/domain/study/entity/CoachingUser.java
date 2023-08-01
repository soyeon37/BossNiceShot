package com.ssafy.domain.study.entity;

import com.ssafy.domain.Member.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class CoachingUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coaching_id")
    private Coaching coaching;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public CoachingUser(Coaching coaching, Member member) {
        this.coaching = coaching;
        this.member = member;
    }
}
