package com.ssafy.domain.Companion.dto.response;

import com.ssafy.common.TeeBox;
import com.ssafy.domain.Companion.entity.Companion;
import jakarta.validation.constraints.NotNull;

import java.time.format.DateTimeFormatter;

public record CompanionResponse(
		@NotNull Long id,
		@NotNull String title,
		String contents,
		@NotNull Integer field,
		@NotNull TeeBox teeBox,
		@NotNull Integer aimPeople,
		@NotNull Integer currentPeople,
		@NotNull String teeupDate,
		@NotNull String endDate,
		@NotNull String memberId,
		@NotNull String memberNickname
) {
	public static CompanionResponse from(Companion companion) {
		return new CompanionResponse(
				companion.getId(),
				companion.getTitle(),
				companion.getContents(),
				companion.getField(),
				companion.getTeeBox(),
				companion.getAimPeople(),
				companion.getCurrentPeople(),
				companion.getTeeupDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
				companion.getEndDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
				companion.getMember().getId(),
				companion.getMember().getNickname()
		);
	}
}

