package com.ssafy.domain.Companion.entity;

import com.ssafy.audit.BaseTime;
import com.ssafy.common.TeeBox;
import com.ssafy.domain.Member.entity.Member;
import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Companion extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @NotNull
    @Column(name = "title", length = 50)
    private String title;

    @Column(name = "introduce_content", nullable = true, columnDefinition = "TEXT", length = 300)
    private String contents;

    @Column(nullable = false)
    private int field;

    @Column(name = "tee_box")
    @Enumerated(EnumType.STRING)
    private TeeBox teeBox;

    @Column(name = "aim_people", nullable = false)
    private int aimPeople;

    @Column(name = "current_people", nullable = false)
    private int currentPeople;

    //티업날짜
    @Column(name = "teeup_date", nullable = false)
    private LocalDateTime teeupDate;

    //마감날짜
    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "companion", cascade = CascadeType.ALL)
    private List<CompanionUser> companionUsers = new ArrayList<>();

    //생성자에 @Builder 적용
    @Builder
    public Companion(@NotNull String title, String contents, int field, TeeBox teeBox, int aimPeople, LocalDateTime teeupDate, LocalDateTime endDate, Member member) {
        this.title = title;
        this.contents = contents;
        this.field = field;
        this.teeBox = teeBox;
        this.aimPeople = aimPeople;
        currentPeople = 0;
        this.teeupDate = teeupDate;
        this.endDate = endDate;
        this.member = member;
    }

    public void update(String title, String contents, Integer field, TeeBox teeBox, Integer aimPeople, LocalDateTime teeupDate, LocalDateTime endDate){
        this.title = title;
        this.contents = contents;
        this.field = field;
        this.teeBox = teeBox;
        this.aimPeople = aimPeople;
        this.teeupDate = teeupDate;
        this.endDate = endDate;
    }

    public void addUser() {
        currentPeople++;
    }

    public void subUser() {
        currentPeople--;
    }
}
