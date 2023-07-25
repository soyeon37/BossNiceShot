package com.ssafy.domain.Member.service;

import com.ssafy.Exception.message.ExceptionMessage;
import com.ssafy.Exception.model.TokenCheckFailException;
import com.ssafy.Exception.model.TokenNotFoundException;
import com.ssafy.Exception.model.UserAuthException;
import com.ssafy.Exception.model.UserException;
import com.ssafy.config.security.jwt.JwtTokenProvider;
import com.ssafy.domain.Member.dto.request.SendEmailRequest;
import com.ssafy.domain.Member.dto.request.UpdateMemberRequest;
import com.ssafy.domain.Member.dto.response.*;
import com.ssafy.domain.Member.entity.Member;
import com.ssafy.domain.Member.repository.MemberRepository;
import com.ssafy.config.security.jwt.TokenInfo;
import com.ssafy.domain.Member.dto.request.SignInRequest;
import com.ssafy.domain.Member.dto.request.SignUpRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.mail.MailException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Random;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService{
    private final MemberRepository memberRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder encoder;
    private final RefreshTokenService refreshTokenService;
    private final EmailService emailService;

    private static final String FROM_EMAIL = "soyeun37@gmail.com"; // 발신자 이메일 주소
 // 발신자 이메일 비밀번호

    @Transactional
    public SignUpResponse registMember(SignUpRequest request) {
        log.info(request.toString());
        if(findByMemberId(request.id())!= null){
            throw new IllegalArgumentException("이미 사용중인 아이디입니다.");
        }else if(findByNickname(request.nickname())!=null){
            throw new IllegalArgumentException("이미 사용중인 닉네임입니다.");
        }
        Member member = memberRepository.save(Member.from(request, encoder));
        try {
            memberRepository.flush();
        } catch (DataIntegrityViolationException e) {
            throw new UserAuthException(ExceptionMessage.FAIL_SAVE_DATA);
        }
        return SignUpResponse.from(member);
    }

    public SignInResponse signIn(SignInRequest request) {

        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(request.id(), request.password());
        log.info("authenticationToken={}", authenticationToken);

        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        log.info("authentication={}", authentication);

        // 2-1. 비밀번호 체크
        Optional<Member> member = memberRepository.findById(request.id());
        if(member.isEmpty()){
            throw new UserAuthException(ExceptionMessage.USER_NOT_FOUND);
        } else if(!encoder.matches(request.password(), member.get().getPassword())) {
           throw new UserAuthException(ExceptionMessage.MISMATCH_PASSWORD);
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
            throw new UserAuthException(ExceptionMessage.FAIL_UPDATE_DATA);
        }
        return UpdateMemberResponse.from(member);
    }

    @Transactional
    public String deleteMember(String memberId){
        try {
            memberRepository.deleteById(memberId);
        }catch (DataIntegrityViolationException e){
            throw new UserAuthException(ExceptionMessage.FAIL_DELETE_DATA);
        }
        return "SUCCESS";
    }

    @Transactional
    public ReIssueResponse getAuthorize(String accessToken){
        return ReIssueResponse.from(accessToken, "GET_AUTHORIZE");
    }

    @Transactional
    public ReIssueResponse reissue(String refreshToken, Authentication authentication) {
        // 1. 인가 이름 확인
        log.info("authentication.getName={}", authentication.getName());
        if (authentication.getName() == null) {
            throw new UserAuthException(ExceptionMessage.NOT_AUTHORIZED_ACCESS);
        }
        log.info("refreshToken={}", refreshToken);
        // 2. refreshToken 만료 검사
        if(!jwtTokenProvider.validateToken(refreshToken)){
            // 2-1. refreshToken 만료 시, Redis에서 삭제
            // Front에서 Logout 실행
            refreshTokenService.delValues(refreshToken);
            throw new TokenNotFoundException(ExceptionMessage.TOKEN_VALID_TIME_EXPIRED);
//            return ReIssueResponse.from(null, "INVALID_REFRESH_TOKEN");
        }
        // 3. Redis에서 refreshToken 가져오기
        String id = refreshTokenService.getValues(refreshToken);
        log.info("id from redis={}", id);
        // 4. 권한 검사
        if(id == null || !id.equals(authentication.getName())){
            throw new TokenCheckFailException(ExceptionMessage.MISMATCH_TOKEN);
        }
        return createAccessToken(refreshToken, authentication);
    }

    /**
     * RefreshToken으로 AccessToken 재발급
     */
    private ReIssueResponse createAccessToken(String refreshToken, Authentication authentication){
        // 5. RefreshToken의 만료 기간 확인
        if (jwtTokenProvider.checkExpiredToken(refreshToken)){
            TokenInfo tokenInfo = jwtTokenProvider.generateAccessToken(authentication);
            // 6. RefreshToken으로 AccessToke 발급 성공
            return ReIssueResponse.from(tokenInfo.getAccessToken(), "SUCCESS");
        }
        // RefreshToken 발급 실패
        return ReIssueResponse.from(jwtTokenProvider.generateAccessToken(authentication).getAccessToken(),"GENERAL_FAILURE");
    }

    public SendEmailResponse sendEmail(SendEmailRequest request) {
        // 111111 ~ 999999 6자리 랜덤 난수 생성
        String authString = makeAuthString();
        try{
            emailService.sendMail(FROM_EMAIL, (String) request.id(), "이메일 인증 메일", authString);
        }catch (MailException e){
            throw new UserException(ExceptionMessage.FAIL_SEND_EMAIL);
        }
        log.info("이메일 전송 완료.");
        return new SendEmailResponse(authString);
    }
    private String makeAuthString(){
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 10;
        Random random = new Random();

        String generatedString = random.ints(leftLimit, rightLimit + 1)
                        .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                                .limit(targetStringLength)
                                        .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                                                .toString();
        log.info("인증번호={}", generatedString);
        return generatedString;
    }

    public Member findByMemberId(String memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new UserAuthException(ExceptionMessage.USER_NOT_FOUND)
        );
        return member;
    }

    public Member findByNickname(String nickname) {
        Member member = memberRepository.findByNickname(nickname).orElseThrow(
                () -> new UserAuthException(ExceptionMessage.USER_NOT_FOUND)
        );
        return member;
    }
}