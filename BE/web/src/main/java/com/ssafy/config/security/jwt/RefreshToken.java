package com.ssafy.config.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@AllArgsConstructor
@Getter
@RedisHash(value = "jwtToken", timeToLive = 60*60*24*14)
public class RefreshToken {

    @Id
    private String memberId;

    private String refreshToken;

    @Indexed
    private String accessToken;
}