package com.ssafy.domain.Companion.entity;

import com.ssafy.domain.Member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Companion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long companionId;

    @NotNull
    @Column(name = "title", length = 50)
    private String title;

    @Column(name = "introduce_Content", nullable = true, columnDefinition = "TEXT", length = 300)
    private String contents;

    @Column(nullable = false)
    private int field;

    @Column(name = "tee_Box" , nullable = false)
    private int teeBox;

    @Column(name = "aim_People", nullable = false)
    private int aimPeople;

    @Column(name = "current_People", nullable = false)
    private int currentPeople;

    //티업날짜
    @Column(name = "teeup_Date", nullable = false)
    private Date teeupDate;

    //마감날짜
    @Column(name = "end_Date", nullable = false)
    private Date endDate;

    //동행 모집 작성한 날짜
    @CreatedDate
    @Column(name = "created_Date")
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

}
