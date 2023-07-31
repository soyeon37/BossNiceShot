package com.ssafy.domain.Notification.entity;

import com.ssafy.domain.Member.entity.Member;
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
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    // 코칭글 알림 발신자 id
    @Column(nullable = false)
    private String followee;
    // 코칭글 id
//    @ManyToOne
//    @JoinColumn(name = "coaching_id")
//    private Coaching coaching;

}
