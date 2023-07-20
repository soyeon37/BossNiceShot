package com.ssafy.domain.chat.repository;

import com.ssafy.domain.chat.entity.ChatMessage;
import com.ssafy.domain.chat.entity.ChatRoom;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findAllByChatRoomId(Long roomId, Sort sort);
    void deleteByChatRoomId(Long roomId);
}
