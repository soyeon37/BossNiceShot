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
    public void refuseCompanionUser(Long companionUserId) {
        CompanionUser companionUser = companionUserRepository.findById(companionUserId)
                .orElseThrow(EntityNotFoundException::new);

        companionUserRepository.delete(companionUser);
    }

    public List<CompanionUser> findByCompanionId(Long companionId) {
        return companionUserRepository.findByCompanionIdAndStatus(companionId, Status.ACTIVE);
    }

    @Transactional
    public void deleteByCompanionId(Long companionId) {
        companionUserRepository.deleteByCompanionId(companionId);
    }

    @Transactional
    public CompanionUser acceptCompanionUser(Long companionUserId) {
        CompanionUser companionUser = companionUserRepository.findById(companionUserId)
                .orElseThrow(EntityNotFoundException::new);

        companionUser.active();
        companionService.findById(companionUser.getCompanion().getId()).acceptUser();
        return companionUser;
    }

    @Transactional
    public void leaveCompanion(Long companionId, String companionUserMemberId) {
        CompanionUser companionUser = companionUserRepository.findByCompanionIdAndMemberId(companionId, companionUserMemberId)
                .orElseThrow(EntityNotFoundException::new);

        companionUserRepository.delete(companionUser);
        companionService.findById(companionId).leaveUser();
    }

    public Boolean findByCompanionIdAndMemberId(Long companionId, String memberId) {
        CompanionUser companionUser = companionUserRepository.findByCompanionIdAndMemberId(companionId, memberId).orElse(null);

        return companionUser != null;
    }
}
