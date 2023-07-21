package com.ssafy.domain.chat.service;

import com.ssafy.domain.chat.dto.request.ChatMessageRequest;
import com.ssafy.domain.chat.entity.ChatMessage;
import com.ssafy.domain.chat.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
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
        return chatMessageRepository.insert(chatMessageRequest.toChatMessage());
    }

    public ChatMessage findById(String chatMessageId) {
        ChatMessage chatMessage = chatMessageRepository.findById(chatMessageId).orElseThrow(
                () -> new IllegalArgumentException("해당 채팅 메세지가 존재하지 않습니다. id = " + chatMessageId)
        );
        return chatMessage;
    }

    public List<ChatMessage> findAllByChatRoomIdAsc(Long chatRoomId) {
        Sort sort = Sort.by(Sort.Direction.ASC, "createdTime");
        return chatMessageRepository.findAllByChatRoomId(chatRoomId, sort);
    }

    public void deleteByChatRoomId(Long chatRoomId) {
        chatMessageRepository.deleteByChatRoomId(chatRoomId);
    }
}
