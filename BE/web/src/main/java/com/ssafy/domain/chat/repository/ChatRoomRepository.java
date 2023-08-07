package com.ssafy.domain.chat.repository;

import com.ssafy.domain.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    @Query(value = "select r from ChatRoom r, ChatRoomUser u " +
            "where r.id = u.chatRoom.id " +
            "and r.teeUpTime > now() " +
            "and u.member.id = :chatParticipantMemberId " +
            "and u.status = 'ACCEPT' " +
            "order by r.createdTime desc")
    List<ChatRoom> findByChatParticipantMemberId(@Param("chatParticipantMemberId") String chatParticipantMemberId);
}