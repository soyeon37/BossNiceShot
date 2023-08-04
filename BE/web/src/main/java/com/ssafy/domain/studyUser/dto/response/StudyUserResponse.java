package com.ssafy.domain.studyUser.dto.response;

import com.ssafy.domain.studyUser.entity.StudyUser;
import jakarta.validation.constraints.NotNull;

public record StudyUserResponse(@NotNull Long studyId,
                                @NotNull String memberId,
                                @NotNull String memberNickname) {
    public static StudyUserResponse from(StudyUser studyUser) {
        return new StudyUserResponse(
                studyUser.getStudy().getId(),
                studyUser.getMember().getId(),
                studyUser.getMember().getNickname()
        );
    }
}
