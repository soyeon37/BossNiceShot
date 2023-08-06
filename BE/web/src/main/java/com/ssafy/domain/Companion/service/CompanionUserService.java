package com.ssafy.domain.Companion.service;

import com.ssafy.domain.Companion.dto.request.CompanionUserRequest;
import com.ssafy.domain.Companion.entity.Companion;
import com.ssafy.domain.Companion.entity.CompanionUser;
import com.ssafy.domain.Companion.repository.CompanionUserRepository;
import com.ssafy.domain.Member.service.MemberService;
import com.ssafy.domain.studyUser.entity.StudyUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.checkerframework.checker.nullness.Opt.orElseGet;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CompanionUserService {
    private final CompanionUserRepository companionUserRepository;
    private final CompanionService companionService;
    private final MemberService memberService;

    public List<CompanionUser> findByCompanionId(Long companionId){
        return companionUserRepository.findByCompanionId(companionId);
    }
    //신청한 동행 취소하고
    @Transactional
    public void deleteCompanionUser(Long companionId, String memberId){
        companionUserRepository.deleteByCompanionIdAndMemberId(companionId, memberId);
    }

    // 동행글 신청 기능
    @Transactional
    public CompanionUser createCompanionUser(CompanionUserRequest companionUserRequest, String memberId) {
        CompanionUser companionUser = companionUserRepository.findByCompanionIdAndMemberId(companionUserRequest.companionId(), memberId)
                .orElseGet(() -> companionUserRepository.save(new CompanionUser(memberService.findByMemberId(memberId), companionService.findByCompanionId(companionUserRequest.companionId()))));

        companionService.findByCompanionId(companionUserRequest.companionId()).getCompanionUsers().add(companionUser);
        return companionUser;
    }

//    @Transactional
//    public void cancelCompanionUser(Long companionId, String memberId) {
//        CompanionUser companionUser = companionUserRepository.findByCompanionIdAndMemberId(companionId, memberId)
//                .orElseThrow(() -> new EntityNotFoundException("해당 동행글에 신청한 사용자를 찾을 수 없습니다."));
//
//        // 동행글의 현재 참가자 수를 감소
//        Companion companion = companionService.findByCompanionId(companionId);
//        companion.subUser();
//
//        // companionUsers에서 해당 사용자를 삭제
//        companion.getCompanionUsers().remove(companionUser);

//        companionUserRepository.save(companionUser);
//    }


}
