package com.ssafy.domain.member.controller;

import com.ssafy.config.security.jwt.JwtToken;
import com.ssafy.domain.member.dto.request.MemberLoginRequest;
import com.ssafy.domain.member.dto.request.MemberRegisterRequest;
import com.ssafy.domain.member.entity.Member;
import com.ssafy.domain.member.service.MemberDetailsService;
import com.ssafy.domain.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "member API")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {
    private final MemberDetailsService memberDetailsService;

    @Operation(summary = "회원 로그인", description = "아이디、비밀번호를 입력하여 로그인한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    @PostMapping("/login")
    public ResponseEntity<JwtToken> login(@RequestBody MemberLoginRequest memberLoginRequest) {
        return ResponseEntity.ok(memberDetailsService.login(memberLoginRequest));
    }

    @Operation(summary = "회원가입", description = "회원가입")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "401", description = "인증 실패"),
            @ApiResponse(responseCode = "404", description = "사용자 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    @PostMapping("/register")
    public ResponseEntity<Member> register(@RequestBody MemberRegisterRequest memberRegisterRequest) {
        return ResponseEntity.ok(memberDetailsService.register(memberRegisterRequest));
    }
}