package com.ssafy.domain.study.dto.response;

import com.ssafy.domain.study.entity.LearningUser;
import jakarta.validation.constraints.NotNull;

public record LearningUserResponse(@NotNull Long learningId,
                                   @NotNull String memberId,
                                   @NotNull String memberNickname) {
    public static LearningUserResponse from(LearningUser learningUser) {
        return new LearningUserResponse(
                learningUser.getLearning().getId(),
                learningUser.getMember().getId(),
                learningUser.getMember().getNickname()
        );
    }
}
