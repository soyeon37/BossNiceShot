package com.ssafy.domain.Member.service;

import com.ssafy.Exception.message.ExceptionMessage;
import com.ssafy.Exception.model.TokenCheckFailException;
import com.ssafy.Exception.model.TokenNotFoundException;
import com.ssafy.config.security.jwt.RefreshToken;
import com.ssafy.domain.Member.repository.RefreshTokenRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Slf4j
@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final RedisTemplate redisTemplate;

    // key-value 설정
    public void setValues(String token, String memberId){
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        try{
            values.set(token, memberId);
        }catch (Exception e){
            log.info("Redis save error");
            throw new IllegalArgumentException();
        }
    }

    // key로 value 가져오기
    public String getValues(String token){
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        try{
            return values.get(token);
        }catch (Exception e){
            log.info("Redis get error");
            throw new IllegalArgumentException();
        }
    }

    // key-value 삭제
    public void delValues(String token){
        redisTemplate.delete(token.substring(7));
    }
//    @Transactional
//    public void saveTokenInfo(String memberId, String refreshToken, String accessToken){
//        refreshTokenRepository.save(new RefreshToken(memberId, refreshToken, accessToken));
//    }
//
//    @Transactional
//    public void removeRefreshToken(String accessToken){
//        refreshTokenRepository.findByAccessToken(accessToken)
//                .ifPresent(refreshToken -> refreshTokenRepository.delete(refreshToken));
//    }

    public RefreshToken findRefreshTokenById(String username) {
        return refreshTokenRepository.findById(username).orElseThrow(() -> new TokenNotFoundException(ExceptionMessage.TOKEN_NOT_FOUND));
    }
}
