package com.ssafy.domain.chat.dto.request;

import com.ssafy.domain.Member.entity.Member;
import com.ssafy.domain.chat.entity.ChatRoom;
import com.ssafy.domain.chat.entity.ChatRoomUser;
import jakarta.validation.constraints.NotNull;

public record ChatRoomUserRequest(@NotNull Long chatRoomId) {
    public ChatRoomUser toChatRoomUser(ChatRoom chatRoom, Member member) {
        return new ChatRoomUser(
                chatRoom,
                member
        );
    }
}
