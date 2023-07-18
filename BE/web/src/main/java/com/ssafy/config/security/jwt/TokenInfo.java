package com.ssafy.config.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

/*
클라이언트에 토큰을 보내기 위한 DTO
 */
@Builder
@Data
@AllArgsConstructor
public class TokenInfo {

    private String grantType; // JWT 입증 타입
    private String accessToken;
    private String refreshToken;
}