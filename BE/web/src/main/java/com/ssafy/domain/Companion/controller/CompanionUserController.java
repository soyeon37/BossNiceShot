package com.ssafy.domain.Companion.controller;

import com.ssafy.domain.Companion.dto.request.CompanionUserRequest;
import com.ssafy.domain.Companion.dto.response.CompanionUserResponse;
import com.ssafy.domain.Companion.entity.CompanionUser;
import com.ssafy.domain.Companion.service.CompanionUserService;
import com.ssafy.domain.studyUser.dto.request.StudyUserRequest;
import com.ssafy.domain.studyUser.dto.response.StudyUserResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@Slf4j
@Tag(name = "CompanionUser API")
@RestController
@RequestMapping("/companion/user")
@RequiredArgsConstructor
public class CompanionUserController {
	private final CompanionUserService companionUserService;

	@Operation(summary = "동행 사용자 조회", description = "동행 모집에 참여하는 전체 사용자를 조회한다")
	@GetMapping("/{companionId}")
	public ResponseEntity<List<CompanionUserResponse>> userList(@PathVariable Long companionId) {
		return ResponseEntity.ok(companionUserService.findByCompanionId(companionId).stream().map(CompanionUserResponse::from).toList());
	}

	@Operation(summary = "동행 참여 신청", description = "모집 중인 동행에 참여 신청을 한다")
	@PostMapping("/apply")
	public ResponseEntity<CompanionUserResponse> apply(@RequestBody CompanionUserRequest companionUserRequest, @AuthenticationPrincipal UserDetails userDetails) {
		return ResponseEntity.ok(CompanionUserResponse.from(companionUserService.createCompanionUser(companionUserRequest, userDetails.getUsername())));
	}

	@Operation(summary = "동행 신청 취소", description = "참여된 동행 모집을 취소한다")
	@DeleteMapping("/delete")
	public ResponseEntity<Object> cancelCompanion(@PathVariable Long companionId, @AuthenticationPrincipal UserDetails userDetails) {
		companionUserService.deleteCompanionUser(companionId, userDetails.getUsername());
		return ResponseEntity.ok().build();
	}


	//	@Operation(summary = "동행 신청 취소", description = "참여된 동행 모집을 취소한다")
//	@DeleteMapping("/{companionId}")
//	public ResponseEntity<Object> cancle(@PathVariable Long companionId , String memberId) {
//		companionUserService.deleteCompanionUser(companionId, memberId);
//		return ResponseEntity.ok().build();
//	}


}