package com.ssafy.domain.Member.service;

import com.ssafy.Exception.message.ExceptionMessage;
import com.ssafy.Exception.model.TokenCheckFailException;
import com.ssafy.Exception.model.UserAuthException;
import com.ssafy.config.security.jwt.JwtTokenProvider;
import com.ssafy.config.security.jwt.RefreshToken;
import com.ssafy.domain.Member.dto.request.SendEmailRequest;
import com.ssafy.domain.Member.dto.request.UpdateMemberRequest;
import com.ssafy.domain.Member.dto.response.*;
import com.ssafy.domain.Member.entity.Member;
import com.ssafy.domain.Member.repository.MemberRepository;
import com.ssafy.config.security.jwt.TokenInfo;
import com.ssafy.domain.Member.dto.request.SignInRequest;
import com.ssafy.domain.Member.dto.request.SignUpRequest;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Properties;
import java.util.Random;

//import jakarta.mail

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService{
    private final MemberRepository memberRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder encoder;
    private final RefreshTokenService refreshTokenService;
    private final EmailService emailService;

    private static final String FROM_EMAIL = "soyeun37@gmail.com"; // 발신자 이메일 주소
    private static final String FROM_PASSWORD = "mkzzkrnztadldzls"; // 발신자 이메일 비밀번호


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

    @Transactional(readOnly = true)
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
        Optional<Member> member = memberRepository.findByMemberId(request.memberId());
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

    @Transactional
    public Optional<Member> getMember(String memberId){
        Optional<Member> member;
        try {
            member = memberRepository.findByMemberId(memberId);
        }catch (DataIntegrityViolationException e){
            throw new IllegalArgumentException("회원 정보를 가져오지 못했습니다.");
        }
        return member;
    }

    @Transactional
    public AuthorizeResponse getAuthorize(String accessToken){

        return AuthorizeResponse.from(accessToken, "GET_AUTHORIZE");
    }

    @Transactional
    public AuthorizeResponse reissue(String refreshToken, Authentication authentication) {
        log.info("authentication.getName={}", authentication.getName());
        if (authentication == null || authentication.getName() == null) {
            throw new UserAuthException(ExceptionMessage.NOT_AUTHORIZED_ACCESS);
        }
        log.info("refreshToken={}", refreshToken);
        // refreshToken 만료 검사
        if(!jwtTokenProvider.validateToken(refreshToken)){
            // RefreshToken 만료 시, Redis에서 삭제
            refreshTokenService.delValues(refreshToken);
            return AuthorizeResponse.from(null, "INVALID_REFRESH_TOKEN");
        }
        String id = refreshTokenService.getValues(refreshToken);
        log.info("refreshToken Id={}", id);
        if(id == null || !id.equals(authentication.getName())){
            throw new TokenCheckFailException(ExceptionMessage.MISMATCH_TOKEN);
        }
        return createRefreshToken(refreshToken, authentication);
    }

    private AuthorizeResponse createRefreshToken(String refreshToken, Authentication authentication){
        if (jwtTokenProvider.checkExpiredToken(refreshToken)){
            TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);
            log.info(tokenInfo.getAccessToken());
            return AuthorizeResponse.from(tokenInfo.getAccessToken(), "SUCCESS");
        }
        return AuthorizeResponse.from(jwtTokenProvider.generateToken(authentication).getAccessToken(),"GENERAL_FAILURE");
    }


    public SendEmailResponse sendEmail(SendEmailRequest request) {
        // 111111 ~ 999999 6자리 랜덤 난수 생성
        int authNumber = makeAuthNum();
        try{
            emailService.sendMail(request.Id(), "이메일 인증 메일", "인증번호는 " + authNumber +"입니다.");

        }catch (Exception e){

            e.printStackTrace();
        }
        log.info("이메일 전송 완료.");
        // 이메일 보내기
//        log.info("email={}", request.Id());
//        joinEmail(request.Id(), authNumber);
//
//

        return new SendEmailResponse(authNumber);
    }
    private int makeAuthNum(){
        Random r = new Random();
        int checkNum = r.nextInt(888888) + 111111;

        log.info("인증번호={}", checkNum);
        return checkNum;
    }
//    private String joinEmail(String email, int authNumber) {
//        String toMail = email;
//        String title = "회원 가입 인증 이메일 입니다."; // 이메일 제목
//        String content =
//                "홈페이지를 방문해주셔서 감사합니다." + 	//html 형식으로 작성 !
//                        "<br><br>" +
//                        "인증 번호는 " + authNumber + "입니다." +
//                        "<br>" +
//                        "해당 인증번호를 인증번호 확인란에 기입하여 주세요."; //이메일 내용 삽입
//        mailSend(toMail, title, content);
//        return Integer.toString(authNumber);
//    }
//    public void mailSend( String toMail, String title, String content) {
//        Properties properties = new Properties();
//        properties.put("mail.smtp.host", "smtp.gmail.com"); // SMTP 서버 호스트
//        properties.put("mail.smtp.port", "587"); // SMTP 서버 포트
//        properties.put("mail.smtp.auth", "true"); // 인증 필요
//        properties.put("mail.smtp.starttls.enable", "true");
//        log.info("prop");
//        Session session = Session.getDefaultInstance(properties, new Authenticator() {
//            @Override
//            protected PasswordAuthentication getPasswordAuthentication() {
//                return new PasswordAuthentication(FROM_EMAIL, FROM_PASSWORD);
//
//            }
//        });
//        log.info("session");
//        try {
//            log.info("message");
//            Message message = new MimeMessage(session);
//            message.setFrom(new InternetAddress(FROM_EMAIL));
//            message.setRecipient(Message.RecipientType.TO, new InternetAddress(toMail));
//            message.setSubject(title);
//            message.setText(content);
//
//            Transport.send(message);
//            log.info("message");
//
//            System.out.println("이메일 전송 성공!");
//        } catch (MessagingException e) {
//            log.error("email 전송 실패");
//            e.printStackTrace();
//        }
//    }
}