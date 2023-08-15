package com.ssafy.domain.study.dto.response;

import com.ssafy.common.Status;
import com.ssafy.domain.study.entity.Study;
import jakarta.validation.constraints.NotNull;

import java.time.format.DateTimeFormatter;

public record StudyResponse(@NotNull Long id,
                            @NotNull String title,
                            @NotNull String description,
                            @NotNull String reservedTime,
                            @NotNull Integer capacity,
                            @NotNull Integer studyUserCount,
                            @NotNull Boolean locked,
                            Integer password,
                            @NotNull Status status,
                            @NotNull String memberId,
                            @NotNull String memberNickname,
                            @NotNull String memberImage) {
    public static StudyResponse from(Study study) {
        return new StudyResponse(
                study.getId(),
                study.getTitle(),
                study.getDescription(),
                study.getReservedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
                study.getCapacity(),
                study.getStudyUserCount(),
                study.getLocked(),
                study.getPassword(),
                study.getStatus(),
                study.getMember().getId(),
                study.getMember().getNickname(),
                study.getMember().getImage()
        );
    }
}
