package com.ssafy.domain.Notification.entity;

import com.ssafy.audit.BaseTime;
import com.ssafy.domain.Member.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NotificationCompanion extends BaseTime  {
    // 동행 모집 글 알림 id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 동행 모집 글 알림 수신자 id
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    // 동행 모집 글 알림 발신자 id
    @Column(nullable = false)
    private String followee;

    // 동행 모집 글 id
//    @ManyToOne
//    @JoinColumn(name = "companion_id")
//    private Companion companion;

}
