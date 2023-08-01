package com.ssafy.domain.study.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.domain.Member.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Coaching extends Study {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "reserved_time", columnDefinition = "datetime", nullable = false)
    private LocalDateTime reservedTime;

    @Column(nullable = false)
    private Integer capacity;

    public Coaching(String title, String description, Integer password, Member member, LocalDateTime reservedTime, int capacity) {
        this.setTitle(title);
        this.setDescription(description);
        this.setPassword(password);
        this.setMember(member);
        this.reservedTime = reservedTime;
        this.capacity = capacity;
    }

    public void update(String title, String description, Integer password, LocalDateTime reservedTime, int capacity) {
        this.setTitle(title);
        this.setDescription(description);
        this.setPassword(password);
        this.reservedTime = reservedTime;
        this.capacity = capacity;
    }
}
