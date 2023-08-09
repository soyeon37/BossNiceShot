package com.ssafy.domain.companion.controller;

import com.ssafy.domain.companion.dto.request.CompanionUserRequest;
import com.ssafy.domain.companion.dto.response.CompanionUserResponse;
import com.ssafy.domain.companion.service.CompanionUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Tag(name = "CompanionUser API")
@RestController
@RequestMapping("/companion/user")
@RequiredArgsConstructor
public class CompanionUserController {
	private final CompanionUserService companionUserService;

	@Operation(summary = "동행 모집 참여 신청", description = "모집 중인 동행에 참여 신청을 한다.")
	@PostMapping
	public ResponseEntity<CompanionUserResponse> apply(@RequestBody CompanionUserRequest companionUserRequest, @AuthenticationPrincipal UserDetails userDetails) {
		return ResponseEntity.ok(CompanionUserResponse.from(companionUserService.createCompanionUser(companionUserRequest, userDetails.getUsername())));
	}

	@Operation(summary = "동행 모집 참여 취소", description = "참여된 동행 모집을 취소한다")
	@DeleteMapping("/{companionId}")
	public ResponseEntity<Object> cancel(@PathVariable Long companionId, @AuthenticationPrincipal UserDetails userDetails) {
		companionUserService.deleteByCompanionIdAndMemberId(companionId, userDetails.getUsername());
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "동행 모집 사용자 조회", description = "동행 모집에 참여하는 전체 사용자를 조회한다.")
	@GetMapping("/{companionId}")
	public ResponseEntity<List<CompanionUserResponse>> userList(@PathVariable Long companionId) {
		return ResponseEntity.ok(companionUserService.findByCompanionId(companionId).stream().map(CompanionUserResponse::from).toList());
	}

	@Operation(summary = "동행 모집 사용자 삭제", description = "동행 모집에 참여하는 모든 사용자를 삭제한다.")
	@DeleteMapping("/{companionId}/all")
	public ResponseEntity<Object> deleteByCompanionId(@PathVariable Long companionId) {
		companionUserService.deleteByCompanionId(companionId);
		return ResponseEntity.ok().build();
	}
}