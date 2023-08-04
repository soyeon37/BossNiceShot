package com.ssafy.domain.Companion.service;

import com.ssafy.domain.Companion.entity.CompanionUser;
import com.ssafy.domain.Companion.repository.CompanionUserRepository;
import com.ssafy.domain.Member.service.MemberService;
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

    public List<CompanionUser> findByCompanionId(Long companionId){
        return companionUserRepository.findByCompanionId(companionId);
    }
    //신청한 동행 취소하고
    @Transactional
    public void deleteCompanionUser(Long companionId, String memberId){
        companionUserRepository.deleteByCompanionIdAndMemberId(companionId, memberId);
    }

    // 동행 신청( 신청자의 정보랑 , 동행모집글의 Id 를 request 에서 받아와
    // 이걸 먼저 알림창에 보내야함
}
