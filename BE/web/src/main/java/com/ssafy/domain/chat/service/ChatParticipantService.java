package com.ssafy.domain.chat.service;

import com.ssafy.domain.Member.service.MemberService;
import com.ssafy.domain.chat.dto.request.ChatParticipantRequest;
import com.ssafy.domain.chat.entity.ChatParticipant;
import com.ssafy.domain.chat.repository.ChatParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatParticipantService {
    private final ChatParticipantRepository chatParticipantRepository;
    private final ChatRoomService chatRoomService;
    private final MemberService memberService;

    public List<ChatParticipant> findAllByRoomId(Long roomId) {
        return chatParticipantRepository.findByChatRoomId(roomId);
    }

    public List<ChatParticipant> findAllByMemberId(String memberId) {
        return chatParticipantRepository.findByMemberId(memberId);
    }

    @Transactional
    public ChatParticipant save(ChatParticipantRequest chatParticipantRequest) {
        return chatParticipantRepository.save(ChatParticipantRequest.toChatParticipant(chatRoomService.findById(chatParticipantRequest.roomId()), memberService.findByMemberId(chatParticipantRequest.memberId())));
    }

    @Transactional
    public void delete(Long roomId, String memberId) {
        chatParticipantRepository.deleteByChatRoomIdAndMemberId(roomId, memberId);
    }
}
