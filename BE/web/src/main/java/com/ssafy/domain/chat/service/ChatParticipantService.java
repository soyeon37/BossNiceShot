package com.ssafy.domain.chat.service;

import com.ssafy.domain.Member.entity.Member;
import com.ssafy.domain.Member.repository.MemberRepository;
import com.ssafy.domain.Member.service.MemberService;
import com.ssafy.domain.chat.dto.request.ChatParticipantRequest;
import com.ssafy.domain.chat.entity.ChatParticipant;
import com.ssafy.domain.chat.entity.ChatRoom;
import com.ssafy.domain.chat.repository.ChatParticipantRepository;
import com.ssafy.domain.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatParticipantService {
    private final ChatParticipantRepository chatParticipantRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;

    public List<ChatParticipant> findByRoomId(Long roomId) {
        return chatParticipantRepository.findAllByChatRoomId(roomId);
    }

    @Transactional
    public ChatParticipant save(ChatParticipantRequest chatParticipantRequest) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatParticipantRequest.roomId()).orElseThrow(
                () -> new IllegalArgumentException("해당 채팅 방이 존재하지 않습니다.")
        );

        Member member = memberRepository.findByMemberId(chatParticipantRequest.memberId()).orElseThrow(
                () -> new IllegalArgumentException("해당 회원이 존재하지 않습니다.")
        );

        return chatParticipantRepository.save(ChatParticipantRequest.toChatParticipant(chatRoom, member));
    }

    @Transactional
    public void delete(ChatParticipantRequest chatParticipantRequest) {
        chatParticipantRepository.deleteByRoomIdAndMemberId(chatParticipantRequest.roomId(), chatParticipantRequest.memberId());
    }
}
