package com.ssafy.domain.study.dto.response;

import com.ssafy.domain.study.entity.StudyUser;
import jakarta.validation.constraints.NotNull;

public record StudyUserReponse(@NotNull Long studyId,
                               @NotNull String memberId,
                               @NotNull String memberNickname) {
    public static StudyUserReponse from(StudyUser studyUser) {
        return new StudyUserReponse(
                studyUser.getId().getStudy().getId(),
                studyUser.getId().getMember().getId(),
                studyUser.getId().getMember().getNickname()
        );
    }
}
