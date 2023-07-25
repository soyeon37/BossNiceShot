package com.ssafy.domain.Member.controller;

import com.ssafy.Exception.message.ExceptionMessage;
import com.ssafy.Exception.model.UserAuthException;
import com.ssafy.domain.Member.dto.request.*;
import com.ssafy.domain.Member.dto.response.SignInResponse;
import com.ssafy.domain.Member.service.MemberService;
import com.ssafy.config.ApiResponse;
import com.ssafy.domain.Member.service.RefreshTokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@Slf4j
@Tag(name = "Member API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;
    private final RefreshTokenService refreshTokenService;

    @Operation(summary = "이메일 전송", description = "이메일을 전송하여 인증번호를 발급한다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 실패"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "사용자 없음"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "서버 오류")
    })

    @PostMapping("/sendEmailVerification")
    public ApiResponse sendEmailVerification(@RequestBody SendEmailRequest request ){
        log.info("이메일 전송 시작");
        return ApiResponse.success(memberService.sendEmail(request));
    }

    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 실패"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "사용자 없음"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "서버 오류")
    })
    @PostMapping("/sign-up")
    public ApiResponse signUp(@RequestBody SignUpRequest request) {
        log.info("회원가입 시작");
        return ApiResponse.success(memberService.registMember(request));
    }

    @Operation(summary = "로그인", description = "아이디、비밀번호를 입력하여 로그인한다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 실패"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "사용자 없음"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "서버 오류")
    })
    @PostMapping("/sign-in")
    public ApiResponse signIn(@RequestBody SignInRequest request) {
        log.info("로그인 시작");
        SignInResponse signInResponse = memberService.signIn(request);
        // Redis에 저장
        refreshTokenService.setValues(signInResponse.token().getRefreshToken(), request.id());
        log.info("memberId={}, refreshToken={}",request.id(), signInResponse.token().getRefreshToken());
        return ApiResponse.success(signInResponse);
    }

    /**
     * 로그아웃 시, FrontEnd에서 AccessToken 삭제
     */
    @Operation(summary = "로그아웃", description = "로그아웃")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 실패"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "사용자 없음"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "서버 오류")
    })
    @PostMapping("/logout")
        public ApiResponse logout (HttpServletRequest servletRequest){
            Cookie[] list = servletRequest.getCookies();
            if(list != null){
                for(Cookie cookie : list){
                    if(cookie.getName().equals("refreshToken")){
                        log.info("cookieValue={}", cookie.getValue());
                        refreshTokenService.delValues(cookie.getValue()); // Redis에 저장된 refreshToken 삭제
                        cookie.setMaxAge(0); // Cookie에 저장된 refreshToken 삭제
                    }
                }
            }
        return ApiResponse.success("SUCCESS");
    }


    @Operation(summary = "회원 정보 수정", description = "회원 정보를 수정한다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 실패"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "사용자 없음"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "서버 오류")
    })
    @PutMapping("/update")
    public ApiResponse updateMember (@RequestBody UpdateMemberRequest request, Principal principal){
        String memberId =  principal.getName();
        return ApiResponse.success(memberService.updateMember(request, memberId));
    }

    @Operation(summary = "회원 정보 삭제", description = "회원 정보를 삭제한다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 실패"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "사용자 없음"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "서버 오류")
    })
    @DeleteMapping("/delete")
    public ApiResponse deleteMember (String memberId){
        return ApiResponse.success(memberService.deleteMember(memberId));
    }

    @Operation(summary = "회원 정보 추출", description = "회원 정보를 DB에서 가져온다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 실패"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "사용자 없음"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "서버 오류")
    })
    @GetMapping("/info")
    public ApiResponse info(Authentication authentication){
        if (authentication == null || authentication.getName() == null){
            throw new UserAuthException(ExceptionMessage.NOT_AUTHORIZED_ACCESS);
        }
        return ApiResponse.success(memberService.findByMemberId(authentication.getName()));
    }

    @Operation(summary = "Token 재발급", description = "만료된 Token을 재발급 한다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 실패"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "사용자 없음"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "서버 오류")
    })
    @PostMapping("/reissue")
    public ApiResponse reissue(@RequestBody ReIssueRequest request){
        log.info("토큰 재발급 시작");
        String token = request.refreshToken();
        String refreshToken = token.substring(0, token.length()-1);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ApiResponse.success(memberService.reissue(refreshToken, authentication));
    }

    //
//    @PostMapping("/authorize")
//    public ApiResponse authorize(@RequestHeader("Authorization") String accessToken, Authentication authentication){
//        if (authentication == null || authentication.getName() == null) {
//            throw new UserAuthException(ExceptionMessage.NOT_AUTHORIZED_ACCESS);
//        }
//        return ApiResponse.success(memberService.getAuthorize(accessToken));
//    }

}

