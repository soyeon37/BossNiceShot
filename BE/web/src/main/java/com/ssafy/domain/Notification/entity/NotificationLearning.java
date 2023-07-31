package com.ssafy.domain.Notification.entity;

import com.ssafy.domain.Member.entity.Member;
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
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    // 러닝글 발신자 id
    @Column(nullable = false)
    private String followee;

    // 러닝글 id
//    @ManyToOne
//    @JoinColumn(name = "learning_id")
//    private Learning learning;

}
