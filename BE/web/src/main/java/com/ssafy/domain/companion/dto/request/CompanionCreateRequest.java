package com.ssafy.domain.companion.dto.request;

import com.ssafy.common.TeeBox;
import com.ssafy.domain.companion.entity.Companion;
import com.ssafy.domain.member.entity.Member;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public record CompanionCreateRequest(@NotNull String title,
                                     @NotNull String description,
                                     @NotNull Integer field,
                                     @NotNull TeeBox teeBox,
                                     @NotNull Integer capacity,
                                     @NotNull String teeUptime,
                                     @NotNull String applicationDeadline) {
    public Companion toCompanion(Member member) {
        return Companion.builder()
                .title(title)
                .description(description)
                .field(field)
                .teeBox(teeBox)
                .capacity(capacity)
                .teeUpTime(LocalDateTime.parse(teeUptime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .applicationDeadline(LocalDateTime.parse(applicationDeadline, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .member(member)
                .build();
    }
}