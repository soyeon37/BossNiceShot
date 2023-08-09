package com.ssafy.domain.companion.repository;

import com.ssafy.domain.companion.entity.CompanionChat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanionChatRepository extends MongoRepository<CompanionChat, String> {
    List<CompanionChat> findByCompanionId(Long companionId);
    void deleteByCompanionId(Long companionId);
}
