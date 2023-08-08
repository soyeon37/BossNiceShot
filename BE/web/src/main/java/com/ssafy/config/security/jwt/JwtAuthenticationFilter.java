package com.ssafy.config.security.jwt;

import com.ssafy.Exception.message.ExceptionMessage;
import com.ssafy.Exception.model.TokenCheckFailException;
import io.jsonwebtoken.Jwt;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.PatternMatchUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Enumeration;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        logRequest(request);

        if(request.getRequestURI().equals("/members/sign-in") || request.getRequestURI().equals("/members/sign-up")
                || request.getRequestURI().equals("/members/sendEmailVerification")
                || request.getRequestURI().equals("/members/checkEmail")
                || request.getRequestURI().equals("/members/code")
                || request.getRequestURI().equals("/members/checkNickname")
                || request.getRequestURI().equals("/ws/**")
                || request.getRequestURI().equals("/api/sessions")
                || request.getRequestURI().equals("/api/sessions/**")
                || request.getRequestURI().equals("/study/sessions")
                || request.getRequestURI().equals("/api/sessions/SessionA/connections")
                || request.getRequestURI().equals("/study/sessions/**")){
            log.info("권한 허가");
            chain.doFilter(request, response);
            return;
        }

        // 1. Request Header 에서 JWT 토큰 추출
        String token = resolveAccessToken(request);
        log.info("headerToken={}",token); // Access Token

        // 2. validateToken 으로 토큰 유효성 검사
        if (request.getRequestURI().equals("/members/reissue") || (token != null && jwtTokenProvider.validateToken(token))) {
            // 토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서 SecurityContext 에 저장
            log.info("유효한 토큰입니다.");
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            log.info("authentication={}",authentication.toString());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }else{
            log.error("유효하지 않은 토큰입니다.");
            throw new TokenCheckFailException(ExceptionMessage.FAIL_TOKEN_CHECK);
        }
        log.info("권한 확인 완료.");
        chain.doFilter(request, response);
    }

    private void logRequest(HttpServletRequest request) {
        log.info(String.format(
                "[%s] %s %s",
                request.getMethod(),
                request.getRequestURI().toLowerCase(),
                request.getQueryString() == null ? "" : request.getQueryString())
        );
    }

    // Request Header 에서 Access Token 정보 추출
    private String resolveAccessToken(HttpServletRequest request) {
        log.info("headers={}",request.getHeaderNames());
        Enumeration eHeader = request.getHeaderNames();
        while(eHeader.hasMoreElements()){
            String requestName = (String) eHeader.nextElement();
            String requestValue = request.getHeader(requestName);
            System.out.println("requestName : "+requestName+" | requestValue : "+requestValue);
        }

        String bearerToken = request.getHeader("Authorization");
        log.info("authorization={}",request.getHeader("Authorization"));
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}