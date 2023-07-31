package com.ssafy.domain.study.entity;

import com.ssafy.domain.Member.entity.Member;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StudyUser {
    @EmbeddedId
    private StudyUserId id;

    public StudyUser(Study study, Member member) {
        this.id = new StudyUserId(study, member);
    }
}
