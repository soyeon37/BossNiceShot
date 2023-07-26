package com.ssafy.domain.Member.controller;

import com.ssafy.domain.Member.dto.request.KakaoCallBackRequest;
import com.ssafy.domain.Member.service.OAuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Tag(name = "OAuth API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/oauth")
public class OauthController {
    private final OAuthService oAuthService;
    @PostMapping("/code")
    public void kakaoCallBack(@RequestBody KakaoCallBackRequest request){
        System.out.println(request.code());
        String code = request.code();
        log.info(code);
        oAuthService.getKakaoAccessToken(code);
    }
}
