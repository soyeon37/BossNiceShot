package com.ssafy.domain.Companion.service;


import com.ssafy.domain.Companion.repository.CompanionRepository;
import com.ssafy.domain.Member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CompanionService {
    private final CompanionRepository companionRepository;
    private final MemberRepository memberRepository;

//    @Transactional



}
