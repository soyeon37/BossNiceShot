package com.ssafy.domain.chat.service;

import com.ssafy.domain.Member.service.MemberService;
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
    private final ChatRoomService chatRoomService;
    private final MemberService memberService;

    public ChatMessage findById(Long messageId) {
        ChatMessage chatMessage = chatMessageRepository.findById(messageId).orElseThrow(
                () -> new IllegalArgumentException("해당 채팅 메세지가 존재하지 않습니다. id = " + messageId)
        );
        return chatMessage;
    }

    @Transactional
    public ChatMessage save(ChatMessageRequest chatMessageRequest) {
        return chatMessageRepository.save(chatMessageRequest.toChatMessage(memberService.findByMemberId(chatMessageRequest.memberId()), chatRoomService.findById(chatMessageRequest.roomId())));
    }

    @Transactional
    public List<ChatMessage> findAllByChatRoomIdAsc(Long roomId) {
        Sort sort = Sort.by(Sort.Direction.ASC, "createdTime");
        return chatMessageRepository.findAllByChatRoomId(roomId, sort);
    }

    @Transactional
    public void deleteByChatRoomId(Long roomId) {
        chatMessageRepository.deleteByChatRoomId(roomId);
    }
}
