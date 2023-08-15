package com.ssafy.domain.study.entity;

import com.ssafy.audit.BaseTime;
import com.ssafy.common.Status;
import com.ssafy.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Study extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    private StudyType type;

    @Column(nullable = false, length = 30)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT", length = 500)
    private String description;

    @Column(name = "reserved_time", columnDefinition = "datetime", nullable = false)
    private LocalDateTime reservedTime;

    @Column(nullable = false)
    private Integer capacity;

    @Column(nullable = false)
    private Integer studyUserCount;

    @Column(nullable = false)
    private Boolean locked;

    private Integer password;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public Study(StudyType type, String title, String description, LocalDateTime reservedTime, Integer capacity, Boolean locked, Integer password, Member member) {
        this.type = type;
        this.title = title;
        this.description = description;
        this.reservedTime = reservedTime;
        this.capacity = capacity;
        studyUserCount = 0;
        this.locked = locked;
        this.password = password;
        status = Status.INACTIVE;
        this.member = member;
    }

    public void update(String title, String description, LocalDateTime reservedTime, Integer capacity, Boolean locked, Integer password) {
        this.title = title;
        this.description = description;
        this.reservedTime = reservedTime;
        this.capacity = capacity;
        this.locked = locked;
        this.password = password;
    }

    public void active() {
        this.status = Status.ACTIVE;
    }

    public void enterUser() {
        studyUserCount++;
    }

    public void leaveUser() {
        studyUserCount--;
    }
}
