package com.ssafy.domain.member.dto.response;

import com.ssafy.domain.member.entity.Member;
import com.ssafy.common.TeeBox;
import io.swagger.v3.oas.annotations.media.Schema;

public record SignUpResponse (
        @Schema(description = "회원 아이디", example = "ssafy1234@ssafy.com")
        String id,
        @Schema(description = "회원 비밀번호", example = "1234")
        String password,
        @Schema(description = "회원 닉네임", example = "김싸피")
        String nickname,
        @Schema(description = "회원 티박스", example = "RED")
        TeeBox teeBox,
        @Schema(description = "회원 최고 스코어", example = "72")
        Integer topScore,
        @Schema(description = "회원 평균 스코어", example = "88")
        Integer averageScore,
        @Schema(description = "회원 레벨", example = "보기 플레이어")
        String level,
        @Schema(description = "회원 프로필", example = "apple.jpg")
        String image,
        @Schema(description = "회원 소개", example = "안녕하세요")
        String introduction


){
    public static SignUpResponse from(Member member){
        return new SignUpResponse(
                member.getId(),
                member.getPassword(),
                member.getNickname(),
                member.getTeeBox(),
                member.getTopScore(),
                member.getAverageScore(),
                member.getLevel(),
                member.getImage(),
                member.getIntroduction()
        );
    }
}

