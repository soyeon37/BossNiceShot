package com.ssafy.domain.companion.service;

import com.ssafy.domain.companion.dto.request.CompanionChatRequest;
import com.ssafy.domain.companion.entity.CompanionChat;
import com.ssafy.domain.companion.entity.MessageType;
import com.ssafy.domain.companion.repository.CompanionChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CompanionChatService {
    private final CompanionChatRepository companionChatRepository;

    @Transactional
    public CompanionChat insert(CompanionChatRequest companionChatRequest) {
        if (companionChatRequest.type().equals(MessageType.ENTER)) {
            companionChatRequest = new CompanionChatRequest(companionChatRequest.type(), companionChatRequest.memberNickname() + "님이 입장했습니다.", companionChatRequest.memberId(), companionChatRequest.memberNickname(), companionChatRequest.memberImage(), companionChatRequest.companionId());
        }
        if (companionChatRequest.type().equals(MessageType.EXIT)) {
            companionChatRequest = new CompanionChatRequest(companionChatRequest.type(), companionChatRequest.memberNickname() + "님이 퇴장했습니다.", companionChatRequest.memberId(), companionChatRequest.memberNickname(), companionChatRequest.memberImage(), companionChatRequest.companionId());
        }

        return companionChatRepository.insert(companionChatRequest.toCompanionChat());
    }

    public List<CompanionChat> findByCompanionId(Long companionId) {
        return companionChatRepository.findByCompanionId(companionId);
    }

    public void deleteByCompanionId(Long companionId) {
        companionChatRepository.deleteByCompanionId(companionId);
    }
}
