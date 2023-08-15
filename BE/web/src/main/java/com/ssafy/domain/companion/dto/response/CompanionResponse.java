package com.ssafy.domain.companion.dto.response;

import com.ssafy.common.TeeBox;
import com.ssafy.domain.companion.entity.Companion;
import jakarta.validation.constraints.NotNull;

import java.time.format.DateTimeFormatter;

public record CompanionResponse(
		@NotNull Long id,
		@NotNull String title,
		@NotNull String description,
		@NotNull Integer field,
		@NotNull TeeBox teeBox,
		@NotNull Integer capacity,
		@NotNull Integer companionUserCount,
		@NotNull String teeUpTime,
		@NotNull String memberId,
		@NotNull String memberNickname,
		@NotNull String memberImage
) {
	public static CompanionResponse from(Companion companion) {
		return new CompanionResponse(
				companion.getId(),
				companion.getTitle(),
				companion.getDescription(),
				companion.getField(),
				companion.getTeeBox(),
				companion.getCapacity(),
				companion.getCompanionUserCount(),
				companion.getTeeUpTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
				companion.getMember().getId(),
				companion.getMember().getNickname(),
				companion.getMember().getImage()
		);
	}
}

