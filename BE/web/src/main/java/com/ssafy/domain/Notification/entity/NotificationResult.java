package com.ssafy.domain.Notification.entity;

import com.ssafy.audit.BaseTime;
import com.ssafy.domain.Member.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NotificationResult extends BaseTime {
    // 동행 신청 결과 알림 id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    // 동행 신청 결과 수신자 id
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    // 동행 신청 글 id
//    @ManyToOne
//    @JoinColumn(name = "companion_id")
//    private Companion companion ;

    // 동행 신청 결과 내용
    private String status;


}
