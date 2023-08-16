package com.ssafy.domain.study.dto.request;

import com.ssafy.domain.member.entity.Member;
import com.ssafy.domain.study.entity.Study;
import com.ssafy.domain.study.entity.StudyType;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public record StudyCreateRequest(@NotNull StudyType type,
                                 @NotNull String title,
                                 @NotNull String description,
                                 @NotNull String reservedTime,
                                 @NotNull Integer capacity,
                                 @NotNull Boolean locked,
                                 Integer password) {
    public Study toStudy(Member member) {
        return new Study(
                type, title, description, LocalDateTime.parse(reservedTime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")), capacity, locked, password, member
        );
    }
}
