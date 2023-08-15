package com.ssafy.domain.follow.entity;

import com.ssafy.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower_id")
    private Member follower;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "followee_id")
    private Member followee;

    public Follow(Member follower, Member followee) {
        this.follower = follower;
        this.followee = followee;
    }
}
