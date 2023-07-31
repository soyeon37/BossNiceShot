package com.ssafy.domain.Notification.entity;

import com.ssafy.audit.BaseTime;
import com.ssafy.domain.Member.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NotificationApplication extends BaseTime {

    // 동행 모집 글 알림 id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //

    // 동행 모집 글 작성자 id
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    // 동행 모집 글 id
//    @ManyToOne
//    @JoinColumn(name = "companion_id")
//    private Companion companion;

    // 신청한 사람
    @Column(nullable = false)
    private String applicantId;

}
