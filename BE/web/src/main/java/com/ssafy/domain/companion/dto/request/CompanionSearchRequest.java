package com.ssafy.domain.companion.dto.request;

import com.ssafy.common.TeeBox;

public record CompanionSearchRequest(String title,
									 String memberNickname,
									 String description,
									 TeeBox teeBox,
									 String followerId) {
}
