package com.ssafy.domain.chat.repository;

import com.ssafy.domain.chat.entity.ChatParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatParticipantRepository extends JpaRepository<ChatParticipant, Long> {
    List<ChatParticipant> findByChatRoomId(Long roomId);
    List<ChatParticipant> findByMemberId(String memberId);
    void  deleteByChatRoomIdAndMemberId(Long roomId, String memberId);
}
