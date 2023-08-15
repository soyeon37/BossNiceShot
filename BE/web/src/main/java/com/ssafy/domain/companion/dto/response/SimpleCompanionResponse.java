package com.ssafy.domain.companion.dto.response;

import com.ssafy.common.TeeBox;
import com.ssafy.domain.companion.entity.Companion;
import jakarta.validation.constraints.NotNull;

import java.time.format.DateTimeFormatter;

public record SimpleCompanionResponse(@NotNull Long id,
                                      @NotNull String title,
                                      @NotNull Integer field,
                                      @NotNull TeeBox teeBox,
                                      @NotNull String teeUptime,
                                      @NotNull String memberId,
                                      @NotNull String memberNickname,
                                      @NotNull String memberImage){
    public static SimpleCompanionResponse from(Companion companion) {
        return new SimpleCompanionResponse(
                companion.getId(),
                companion.getTitle(),
                companion.getField(),
                companion.getTeeBox(),
                companion.getTeeUpTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
                companion.getMember().getId(),
                companion.getMember().getNickname(),
                companion.getMember().getImage()
        );
    }
}
