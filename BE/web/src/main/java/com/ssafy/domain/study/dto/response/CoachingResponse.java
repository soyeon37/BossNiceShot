package com.ssafy.domain.study.dto.response;

import com.ssafy.domain.study.entity.Coaching;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record CoachingResponse(@NotNull Long id,
                               @NotNull String title,
                               @NotNull String description,
                               Integer password,
                               @NotNull LocalDateTime reservedTime,
                               @NotNull Integer capacity,
                               @NotNull Integer attendeeCount,
                               @NotNull String coachId,
                               @NotNull String coachNickname){
    public static CoachingResponse from(Coaching coaching) {
        return new CoachingResponse(
                coaching.getId(),
                coaching.getTitle(),
                coaching.getDescription(),
                coaching.getPassword(),
                coaching.getReservedTime(),
                coaching.getCapacity(),
                coaching.getUsers().size(),
                coaching.getMember().getId(),
                coaching.getMember().getNickname()
        );
    }
}
