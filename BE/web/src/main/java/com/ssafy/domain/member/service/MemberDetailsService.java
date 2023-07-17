package com.ssafy.domain.member.service;

import com.ssafy.config.security.jwt.JwtToken;
import com.ssafy.config.security.jwt.JwtTokenProvider;
import com.ssafy.domain.member.dto.request.MemberLoginRequest;
import com.ssafy.domain.member.dto.request.MemberRegisterRequest;
import com.ssafy.domain.member.entity.Member;
import com.ssafy.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberDetailsService {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder encoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

    public Member register(MemberRegisterRequest memberRegisterRequest) {
        return memberRepository.save(memberRegisterRequest.toMember(encoder));
    }

    public JwtToken login(MemberLoginRequest memberLoginRequest) {
        Member member = memberRepository.findByEmail(memberLoginRequest.email());
        if (!member.matchPassword(encoder, memberLoginRequest.password())) {
            return null;
        }

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(memberLoginRequest.email(), memberLoginRequest.password());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        return jwtTokenProvider.generaToken(authentication);
    }
}