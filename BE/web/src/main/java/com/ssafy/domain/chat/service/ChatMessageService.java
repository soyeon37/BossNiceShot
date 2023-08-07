package com.ssafy.domain.chat.service;

import com.ssafy.domain.chat.dto.request.ChatMessageRequest;
import com.ssafy.domain.chat.entity.ChatMessage;
import com.ssafy.domain.chat.entity.MessageType;
import com.ssafy.domain.chat.repository.ChatMessageRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;

    @Transactional
    public ChatMessage insert(ChatMessageRequest chatMessageRequest) {
        if (chatMessageRequest.type().equals(MessageType.ENTER)) {
            chatMessageRequest = new ChatMessageRequest(chatMessageRequest.type(), chatMessageRequest.memberNickname() + "님이 입장했습니다.", chatMessageRequest.memberId(), chatMessageRequest.memberNickname(), chatMessageRequest.chatRoomId());
        }
        if (chatMessageRequest.type().equals(MessageType.EXIT)) {
            chatMessageRequest = new ChatMessageRequest(chatMessageRequest.type(), chatMessageRequest.memberNickname() + "님이 퇴장했습니다.", chatMessageRequest.memberId(), chatMessageRequest.memberNickname(), chatMessageRequest.chatRoomId());
        }

        return chatMessageRepository.insert(chatMessageRequest.toChatMessage());
    }

    public ChatMessage findById(String chatMessageId) {
        return chatMessageRepository.findById(chatMessageId).orElseThrow(EntityNotFoundException::new);
    }

    public List<ChatMessage> findByChatRoomIdAsc(Long chatRoomId) {
        return chatMessageRepository.findByChatRoomId(chatRoomId);
    }

    public void deleteByChatRoomId(Long chatRoomId) {
        chatMessageRepository.deleteByChatRoomId(chatRoomId);
    }
}
