package com.ssafy.domain.Companion.dto.response;

import com.ssafy.domain.Companion.entity.CompanionUser;
import jakarta.validation.constraints.NotNull;

public record CompanionUserResponse(
        @NotNull Long companionId,
        @NotNull String memberId,
        @NotNull String memberNickname,
        boolean status) {
    public static CompanionUserResponse from(CompanionUser companionUser) {
        return new CompanionUserResponse(
                companionUser.getCompanion().getId(),
                companionUser.getMember().getId(),
                companionUser.getMember().getNickname(),
                companionUser.isStatus()
                );
    }

}
