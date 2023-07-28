package com.ssafy.domain.study.dto.response;

import com.ssafy.domain.study.entity.StudyUser;
import jakarta.validation.constraints.NotNull;

public record StudyUserReponse(@NotNull Long studyId,
                               @NotNull String memberId,
                               @NotNull String memberNickname) {
    public static StudyUserReponse from(StudyUser studyUser) {
        return new StudyUserReponse(
                studyUser.getStudy().getId(),
                studyUser.getMember().getId(),
                studyUser.getMember().getNickname()
        );
    }
}
