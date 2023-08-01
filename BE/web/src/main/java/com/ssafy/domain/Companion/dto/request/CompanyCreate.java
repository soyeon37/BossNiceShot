package com.ssafy.domain.Companion.dto.request;

import com.ssafy.common.TeeBox;
import com.ssafy.domain.Companion.entity.Companion;
import com.ssafy.domain.Member.entity.Member;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public record CompanyCreate(@NotNull String title,
                            String contents,
                            @NotNull Integer field,
                            @NotNull TeeBox teeBox,
                            @NotNull Integer aimPeople,
                            @NotNull Integer currentPeople,
                            @NotNull String teeupDate,
                            @NotNull String endDate) {
    public Companion toCompanion(Member member) {
        return Companion.builder()
                .title(title)
                .contents(contents)
                .field(field)
                .teeBox(teeBox)
                .aimPeople(aimPeople)
                .currentPeople(currentPeople)
                .teeupDate(LocalDateTime.parse(teeupDate, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .endDate(LocalDateTime.parse(endDate, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .teeupDate(LocalDateTime.parse(teeupDate, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .endDate(LocalDateTime.parse(endDate, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .member(member)
                .build();
    }
}
