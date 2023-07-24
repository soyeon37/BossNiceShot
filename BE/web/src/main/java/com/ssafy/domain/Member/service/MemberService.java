package com.ssafy.domain.Member.service;

import com.ssafy.config.security.jwt.JwtTokenProvider;
import com.ssafy.domain.Member.dto.request.UpdateMemberRequest;
import com.ssafy.domain.Member.dto.response.UpdateMemberResponse;
import com.ssafy.domain.Member.entity.Member;
import com.ssafy.domain.Member.repository.MemberRepository;
import com.ssafy.config.security.jwt.TokenInfo;
import com.ssafy.domain.Member.dto.response.SignInResponse;
import com.ssafy.domain.Member.dto.request.SignInRequest;
import com.ssafy.domain.Member.dto.response.SignUpResponse;
import com.ssafy.domain.Member.dto.request.SignUpRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder encoder;

    @Transactional
    public SignUpResponse registMember(SignUpRequest request) {
        Member member = memberRepository.save(Member.from(request, encoder));
        try {
            memberRepository.flush();
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("이미 사용중인 아이디입니다.");
        }
        return SignUpResponse.from(member);
    }

    public SignInResponse signIn(SignInRequest request) {

        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(request.memberId(), request.password());
        log.info("authenticationToken={}", authenticationToken);

        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        log.info("authentication={}", authentication);

        // 2-1. 비밀번호 체크
        Optional<Member> member = memberRepository.findById(request.memberId());
        if(!encoder.matches(request.password(), member.get().getPassword())) {
            return null;
        }

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

        return new SignInResponse(member.get().getPassword(), tokenInfo);
    }

    @Transactional
    public UpdateMemberResponse updateMember(UpdateMemberRequest request, String memberId){
        Member member = memberRepository.save(Member.update(request, encoder, memberId));
        try {
            memberRepository.flush();
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("회원 정보 수정에 실패했습니다.");
        }
        return UpdateMemberResponse.from(member);
    }

    @Transactional
    public String deleteMember(String memberId){
        try {
            memberRepository.deleteById(memberId);
        }catch (DataIntegrityViolationException e){
            throw new IllegalArgumentException("회원 삭제에 실패했습니다.");
        }
        return "회원 정보 삭제 수행";
    }

    public Member findByMemberId(String memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new IllegalArgumentException("해당 회원이 존재하지 않습니다. id = " + memberId)
        );

        return member;
    }
}