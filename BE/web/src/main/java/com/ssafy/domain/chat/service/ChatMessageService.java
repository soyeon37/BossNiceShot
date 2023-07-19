package com.ssafy.domain.chat.service;

import com.ssafy.domain.chat.dto.request.ChatMessageRequest;
import com.ssafy.domain.chat.dto.response.ChatMessageResponse;
import com.ssafy.domain.chat.entity.ChatMessage;
import com.ssafy.domain.chat.entity.ChatRoom;
import com.ssafy.domain.chat.repository.ChatMessageRepository;
import com.ssafy.domain.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ChatMessageService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;

    @Transactional
    public ChatMessageResponse findById(final Long messageId) {
        ChatMessage chatMessage = chatMessageRepository.findById(messageId).orElseThrow(
                () -> new IllegalArgumentException("해당 ChatMessage가 존재하지 않습니다. id = " + messageId)
        );

        return ChatMessageResponse.from(chatMessage);
    }

    @Transactional
    public Long save(ChatMessageRequest chatMessageRequest) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatMessageRequest.roomId()).orElseThrow(
                () -> new IllegalArgumentException("해당 ChatRoom이 존재하지 않습니다. id = " + chatMessageRequest.roomId())
        );

        return chatMessageRepository.save(chatMessageRequest.toChatMessage(chatRoom)).getId();
    }

    @Transactional
    public List<ChatMessageResponse> findAllByChatRoomIdAsc(Long roomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(roomId).orElseThrow(
                () -> new IllegalArgumentException("해당 ChatRoom이 존재하지 않습니다. id = " + roomId)
        );

        Sort sort = Sort.by(Sort.Direction.ASC, "createdTime");

        return chatMessageRepository.findAllByChatRoom(chatRoom, sort).stream().map(ChatMessageResponse::from).toList();
    }
}
