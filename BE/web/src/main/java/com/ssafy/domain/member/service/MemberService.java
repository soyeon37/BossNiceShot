package com.ssafy.domain.member.service;

import com.ssafy.config.security.jwt.JwtToken;
import com.ssafy.config.security.jwt.JwtTokenProvider;
import com.ssafy.domain.member.entity.Member;
import com.ssafy.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;

    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    public void delete(String email) {
        Member member = memberRepository.findByEmail(email);
        if (member == null) {
            return;
        }

        memberRepository.delete(member);
    }
}
