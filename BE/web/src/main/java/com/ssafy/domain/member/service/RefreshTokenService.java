package com.ssafy.domain.member.service;

import com.ssafy.Exception.message.ExceptionMessage;
import com.ssafy.Exception.model.TokenNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
public class RefreshTokenService {

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
        }catch (RuntimeException e){
            log.info("Redis get error");
            throw new TokenNotFoundException(ExceptionMessage.TOKEN_NOT_FOUND);
        }
    }

    // key-value 삭제
    public void delValues(String token) throws TokenNotFoundException{
        try{
            redisTemplate.delete(token);
        }catch (RuntimeException e){
            log.info("Redis delete error");
            throw new TokenNotFoundException(ExceptionMessage.TOKEN_NOT_FOUND);
        }
    }
}
