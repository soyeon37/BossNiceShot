package com.ssafy.domain.study.entity;

import com.ssafy.domain.Member.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Learning extends Study{
    public Learning(String title, String description, Integer password, Member member) {
        super(title, description, password, member);
    }
}
