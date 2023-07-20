package com.ssafy.domain.Member.controller;

import com.ssafy.Exception.message.ExceptionMessage;
import com.ssafy.Exception.model.UserAuthException;
import com.ssafy.domain.Member.dto.request.SignInRequest;
import com.ssafy.domain.Member.dto.request.SignUpRequest;
import com.ssafy.domain.Member.dto.request.UpdateMemberRequest;
import com.ssafy.domain.Member.dto.response.SignInResponse;
import com.ssafy.domain.Member.repository.MemberRepository;
import com.ssafy.domain.Member.service.MemberService;
import com.ssafy.config.ApiResponse;
import com.ssafy.domain.Member.service.RefreshTokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@Slf4j
@Tag(name = "Member API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final RefreshTokenService refreshTokenService;

    @Operation(summary = "회원 가입", description = "회원 가입")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 실패"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "사용자 없음"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "서버 오류")
    })
    @PostMapping("/sign-up")
    public ApiResponse signUp(@RequestBody SignUpRequest request) {
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
    public ApiResponse signIn(@RequestBody SignInRequest request, HttpServletRequest servletRequest, HttpServletResponse servletResponse) {

        SignInResponse signInResponse = memberService.signIn(request);
        ResponseCookie cookie = ResponseCookie.from("RefreshToken", signInResponse.token().getRefreshToken())
                .maxAge(7 * 24 * 60 * 60) // 유효 기간 7일 후 만료
                .path("/")
                .secure(true) // https 환경에서만 쿠키 발동
                .sameSite("None") // 동일 및 크로스 사이트 쿠키 전송 가능
                .httpOnly(true)
                .build();
        servletResponse.setHeader("Set-Cookie", cookie.toString());
        // Redis에 저장
        refreshTokenService.setValues(signInResponse.token().getRefreshToken(), request.memberId());
        log.info("memberId={}",request.memberId());
        log.info("refreshToken={}",signInResponse.token().getRefreshToken());

        return ApiResponse.success(signInResponse);
    }

    @Operation(summary = "로그아웃", description = "로그아웃")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 실패"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "사용자 없음"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "서버 오류")
    })
    @PostMapping("/logout")
                public ApiResponse logout (HttpServletRequest servletRequest, String accessToken){
                    Cookie[] list = servletRequest.getCookies();
                    if(list != null){
                        for(Cookie cookie : list){
                            refreshTokenService.delValues(cookie.getValue());
                            log.info("cookie={}",cookie);
                log.info("cookie={}",cookie.getValue());
                cookie.setMaxAge(0);
            }
        }
        return ApiResponse.success("");
    }

    @Operation(summary = "회원 정보 수정", description = "회원 정보를 수정한다.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "성공"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "인증 실패"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "사용자 없음"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "서버 오류")
    })
    @PutMapping("/update")
    public ApiResponse updateMember (@RequestBody UpdateMemberRequest request, HttpServletRequest servletRequest){
        // temp
        Cookie[] list = servletRequest.getCookies();
        String memberId = "";
        if(list != null){
            for (Cookie cookie:list) {
                if (cookie.getName().equals("RefreshToken")) {
                    // 있으면 redis에 저장된 member 정보 반환
                    log.info("Cookie={}", cookie.getValue());
                    memberId = refreshTokenService.getValues(cookie.getValue());
                    log.info("memberId={}", memberId);
                }
            }
        }
        return ApiResponse.success(memberService.updateMember(request, memberId));
    }

    @DeleteMapping("/delete")
    public ApiResponse deleteMember (String memberId){
        return ApiResponse.success(memberService.deleteMember(memberId));
    }

    @GetMapping("/info")
    public ApiResponse info(Authentication authentication){
        if (authentication == null || authentication.getName() == null){
            throw new UserAuthException(ExceptionMessage.NOT_AUTHORIZED_ACCESS);
        }
        return ApiResponse.success(memberService.getMember(authentication.getName()));
    }
    @PostMapping("/authorize")
    public ApiResponse authorize(@RequestHeader("Authorization") String accessToken, Authentication authentication){
        if (authentication == null || authentication.getName() == null) {
            throw new UserAuthException(ExceptionMessage.NOT_AUTHORIZED_ACCESS);
        }
        return ApiResponse.success(memberService.getAuthorize(accessToken));
    }

    @PostMapping("/reissue")
    public ApiResponse reissue(@CookieValue("RefreshToken")String refreshToken, Authentication authentication){
        return ApiResponse.success(memberService.reissue(refreshToken, authentication));
    }


}

