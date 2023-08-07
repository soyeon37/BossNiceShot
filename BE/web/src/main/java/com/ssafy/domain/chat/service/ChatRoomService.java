package com.ssafy.domain.chat.service;

import com.ssafy.domain.Member.service.MemberService;
import com.ssafy.domain.chat.dto.request.ChatRoomRequest;
import com.ssafy.domain.chat.entity.ChatRoom;
import com.ssafy.domain.chat.repository.ChatRoomRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final MemberService memberService;

    public ChatRoom findById(Long chatRoomId) {
        return chatRoomRepository.findById(chatRoomId).orElseThrow(EntityNotFoundException::new);
    }

    @Transactional
    public ChatRoom save(ChatRoomRequest chatRoomRequest, String memberId) {
        return chatRoomRepository.save(chatRoomRequest.toChatRoom(memberService.findByMemberId(memberId)));
    }

    @Transactional
    public void deleteById(Long chatRoomId) {
        chatRoomRepository.deleteById(chatRoomId);
    }

    public List<ChatRoom> findByChatRoomUserMemberId(String chatRoomUserMemberId) {
        return chatRoomRepository.findByChatParticipantMemberId(chatRoomUserMemberId);
    }
}