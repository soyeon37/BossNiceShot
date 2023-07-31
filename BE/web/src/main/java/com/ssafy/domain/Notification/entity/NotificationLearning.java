package com.ssafy.domain.Notification.entity;

import com.ssafy.domain.Member.entity.Member;
import com.ssafy.domain.study.entity.Learning;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NotificationLearning {
    // 러닝글 알림 id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 러닝글 수신자 id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower_id")
    private Member follower;

    // 러닝글 발신자 id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "followee_id")
    private Member followee;

    // 러닝글 id
    @ManyToOne
    @JoinColumn(name = "learning_id")
    private Learning learning;

    public NotificationLearning(Member follower, Member followee){
        this.follower = follower;
        this.followee = followee;
    }

}
