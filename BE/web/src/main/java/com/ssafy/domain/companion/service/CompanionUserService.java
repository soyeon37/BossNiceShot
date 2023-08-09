package com.ssafy.domain.companion.service;

import com.ssafy.common.Status;
import com.ssafy.domain.companion.dto.request.CompanionUserRequest;
import com.ssafy.domain.companion.entity.CompanionUser;
import com.ssafy.domain.companion.repository.CompanionUserRepository;
import com.ssafy.domain.member.service.MemberService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CompanionUserService {
    private final CompanionUserRepository companionUserRepository;
    private final CompanionService companionService;
    private final MemberService memberService;

    @Transactional
    public CompanionUser createCompanionUser(CompanionUserRequest companionUserRequest, String memberId) {
        return companionUserRepository.findByCompanionIdAndMemberId(companionUserRequest.companionId(), memberId)
                .orElseGet(() -> companionUserRepository.save(companionUserRequest.toCompanionUser(companionService.findById(companionUserRequest.companionId()), memberService.findByMemberId(memberId))));
    }

    @Transactional
    public void deleteByCompanionIdAndMemberId(Long companionId, String memberId) {
        companionUserRepository.findByCompanionIdAndMemberId(companionId, memberId)
                .orElseThrow(EntityNotFoundException::new);

        companionUserRepository.deleteByCompanionIdAndMemberId(companionId, memberId);
    }

    public List<CompanionUser> findByCompanionId(Long companionId){
        return companionUserRepository.findByCompanionIdAndStatus(companionId, Status.ACTIVE);
    }

    @Transactional
    public void deleteByCompanionId(Long companionId) {
        companionUserRepository.deleteByCompanionId(companionId);
    }
}
