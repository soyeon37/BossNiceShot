package com.ssafy.domain.chat.service;

import com.ssafy.domain.Member.service.MemberService;
import com.ssafy.domain.chat.dto.request.ChatRoomUserRequest;
import com.ssafy.domain.chat.entity.ChatRoomUser;
import com.ssafy.domain.chat.repository.ChatRoomUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatRoomUserService {
    private final ChatRoomUserRepository chatRoomUserRepository;
    private final ChatRoomService chatRoomService;
    private final MemberService memberService;

    @Transactional
    public ChatRoomUser save(ChatRoomUserRequest chatRoomUserRequest, String memberId) {
        return chatRoomUserRepository.save(chatRoomUserRequest.toChatRoomUser(chatRoomService.findById(chatRoomUserRequest.chatRoomId()), memberService.findByMemberId(memberId)));
    }

    public List<ChatRoomUser> findByChatRoomId(Long chatRoomId) {
        return chatRoomUserRepository.findByChatRoomId(chatRoomId);
    }

    @Transactional
    public void deleteByChatRoomId(Long chatRoomId) {
        chatRoomUserRepository.deleteByChatRoomId(chatRoomId);
    }

    @Transactional
    public void deleteByMemberId(String memberId) {
        chatRoomUserRepository.deleteByMemberId(memberId);
    }

    @Transactional
    public void deleteByChatRoomIdAntMemberId(Long chatRoomId, String memberId) {
        chatRoomUserRepository.deleteByChatRoomIdAndMemberId(chatRoomId, memberId);
    }
}
