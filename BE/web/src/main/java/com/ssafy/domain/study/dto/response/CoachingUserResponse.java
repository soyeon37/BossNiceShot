package com.ssafy.domain.study.dto.response;

import com.ssafy.domain.study.entity.CoachingUser;
import jakarta.validation.constraints.NotNull;

public record CoachingUserResponse(@NotNull Long coachingId,
                               @NotNull String memberId,
                               @NotNull String memberNickname) {
    public static CoachingUserResponse from(CoachingUser coachingUser) {
        return new CoachingUserResponse(
                coachingUser.getCoaching().getId(),
                coachingUser.getMember().getId(),
                coachingUser.getMember().getNickname()
        );
    }
}
