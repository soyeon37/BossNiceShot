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
public class NotificationApplication extends BaseTime {

    // 동행 모집 글 알림 id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //

    // 동행 모집 글 작성자 id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member memberId;

    // 동행 모집 글 id
//    @ManyToOne
//    @JoinColumn(name = "companion_id")
//    private Companion companion;

    // 신청한 사람
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "applicant_id")
    private Member applicantId;

    public NotificationApplication(Member memberId, Member applicantId){
        this.memberId = memberId;
        this.applicantId = applicantId;
    }


}
