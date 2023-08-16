package com.ssafy.domain.member.dto.request;

import com.ssafy.common.TeeBox;
import io.swagger.v3.oas.annotations.media.Schema;

public record UpdateMemberRequest(
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
) {}
