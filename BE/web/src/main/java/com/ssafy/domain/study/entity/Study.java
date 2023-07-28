package com.ssafy.domain.study.entity;

import com.ssafy.audit.BaseTime;
import com.ssafy.domain.Member.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn
@EntityListeners(AuditingEntityListener.class)
public class Study extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false, length = 30)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT", length = 500)
    private String description;

    private Integer password;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "study", cascade = CascadeType.ALL)
    private List<StudyUser> users = new ArrayList<>();

    public Study(String title, String description, Integer password, Member member) {
        this.title = title;
        this.description = description;
        this.password = password;
        this.member = member;
    }

    public void update(String title, String description, Integer password) {
        this.title = title;
        this.description = description;
        this.password = password;
    }
}
