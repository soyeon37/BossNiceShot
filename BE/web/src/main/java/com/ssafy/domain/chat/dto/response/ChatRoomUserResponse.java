package com.ssafy.domain.chat.dto.response;

import com.ssafy.domain.chat.entity.ChatRoomUser;
import jakarta.validation.constraints.NotNull;

public record ChatRoomUserResponse(@NotNull Long roomId,
                                   @NotNull String memberId,
                                   @NotNull String memberNickname) {
    public static ChatRoomUserResponse from(ChatRoomUser chatParticipant) {
        return new ChatRoomUserResponse(
                chatParticipant.getChatRoom().getId(),
                chatParticipant.getMember().getId(),
                chatParticipant.getMember().getNickname()
        );
    }
}
