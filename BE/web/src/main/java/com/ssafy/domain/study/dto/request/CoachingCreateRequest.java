package com.ssafy.domain.study.dto.request;

import com.ssafy.domain.Member.entity.Member;
import com.ssafy.domain.study.entity.Coaching;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record CoachingCreateRequest(@NotNull String title,
                                    @NotNull String description,
                                    @NotNull Integer password,
                                    @NotNull LocalDateTime reservedTime,
                                    int capacity) {
    public Coaching toCoaching(Member member) {
        return new Coaching(title, description, password, member, reservedTime, capacity);
    }
}
