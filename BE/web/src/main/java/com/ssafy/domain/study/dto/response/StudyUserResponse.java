package com.ssafy.domain.study.dto.response;

import com.ssafy.domain.study.entity.StudyUser;
import jakarta.validation.constraints.NotNull;

public record StudyUserResponse(@NotNull Long studyId,
                                @NotNull String memberId,
                                @NotNull String memberNickname,
                                @NotNull String memberImage) {
    public static StudyUserResponse from(StudyUser studyUser) {
        return new StudyUserResponse(
                studyUser.getStudy().getId(),
                studyUser.getMember().getId(),
                studyUser.getMember().getNickname(),
                studyUser.getMember().getImage()
        );
    }
}
