package com.ssafy.domain.chat.repository;

import com.ssafy.domain.chat.entity.ChatMessage;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {
    List<ChatMessage> findAllByChatRoomId(Long roomId, Sort sort);
    void deleteByChatRoomId(Long roomId);
}
