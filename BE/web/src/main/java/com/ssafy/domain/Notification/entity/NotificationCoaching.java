package com.ssafy.domain.Notification.entity;

import com.ssafy.audit.BaseTime;
import com.ssafy.domain.Member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class NotificationCoaching extends BaseTime {
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
    @Column(name = "coaching_id")
    private Long coaching;

//    public NotificationCoaching(Member follower, Member followee, int id){
//        this.follower = follower;
//        this.followee = followee;
//        this.coaching = id;
//    }

    public static NotificationCoaching from(Member follower, Member followee, Long id){
        return NotificationCoaching.builder()
                .follower(follower)
                .followee(followee)
                .coaching(id)
                .build();
    }



}
