package com.ssafy.domain.study.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Coaching extends Study {
    @Column(name = "reserved_time", columnDefinition = "datetime", nullable = false)
    private LocalDateTime reservedTime;

    @Column(nullable = false)
    private int capacity;
}
