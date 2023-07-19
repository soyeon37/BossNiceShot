package com.ssafy.domain.chat.dto.request;

import com.ssafy.domain.Member.entity.Member;
import com.ssafy.domain.chat.entity.ChatParticipant;
import com.ssafy.domain.chat.entity.ChatRoom;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

public record ChatParticipantRequest(@NotNull Long roomId,
                                     @NotNull String memberId) {
    public static ChatParticipant toChatParticipant(ChatRoom chatRoom, Member member) {
        return new ChatParticipant(chatRoom, member);
    }
}
