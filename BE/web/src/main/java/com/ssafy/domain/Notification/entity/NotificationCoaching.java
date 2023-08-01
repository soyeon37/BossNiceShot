package com.ssafy.domain.Notification.entity;

import com.ssafy.domain.Member.entity.Member;
import com.ssafy.domain.study.entity.Study;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NotificationCoaching {
    // 코칭글 알림 id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 코칭글 알림 수신자 id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower_id")
    private Member follower;

    // 코칭글 알림 발신자 id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "followee_id")
    private Member followee;

    // 코칭글 id
    @ManyToOne
    @JoinColumn(name = "coaching_id")
    private Study coaching;

    public NotificationCoaching(Member follower, Member followee){
        this.follower = follower;
        this.followee = followee;
    }

}
