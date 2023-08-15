package com.ssafy.domain.member.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record KakaoCallBackRequest(
        @Schema(description = "카카오 로그인 API 인증 코드")
        String code
) {

}
