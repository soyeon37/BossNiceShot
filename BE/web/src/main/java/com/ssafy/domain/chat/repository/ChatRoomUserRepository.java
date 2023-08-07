package com.ssafy.domain.chat.repository;

import com.ssafy.domain.chat.entity.ChatRoomUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomUserRepository extends JpaRepository<ChatRoomUser, Long> {
    List<ChatRoomUser> findByChatRoomId(Long chatRoomId);
    void deleteByMemberId(String memberId);
    void deleteByChatRoomId(Long chatRoomId);
    void deleteByChatRoomIdAndMemberId(Long chatRoomId, String memberId);
}
