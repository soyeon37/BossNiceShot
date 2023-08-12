package com.ssafy.domain.follow.dto.response;

import com.ssafy.common.TeeBox;
import com.ssafy.domain.follow.entity.Follow;
import jakarta.validation.constraints.NotNull;

public record FollowResponse (@NotNull String followeeId,
                              @NotNull String followeeNickname,
                              @NotNull String followeeLevel,
                              @NotNull TeeBox followeeTeeBox,
                              @NotNull String followeeImage){
    public static FollowResponse from(Follow follow) {
        return new FollowResponse(
                follow.getFollowee().getId(),
                follow.getFollowee().getNickname(),
                follow.getFollowee().getLevel(),
                follow.getFollowee().getTeeBox(),
                follow.getFollowee().getImage()
        );
    }
}
