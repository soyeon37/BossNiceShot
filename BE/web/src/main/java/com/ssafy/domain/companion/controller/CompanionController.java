package com.ssafy.domain.companion.controller;

import com.ssafy.domain.companion.dto.request.CompanionCreateRequest;
import com.ssafy.domain.companion.dto.request.CompanionSearchRequest;
import com.ssafy.domain.companion.dto.request.CompanionUpdateRequest;
import com.ssafy.domain.companion.dto.response.CompanionResponse;
import com.ssafy.domain.companion.dto.response.SimpleCompanionResponse;
import com.ssafy.domain.companion.entity.Companion;
import com.ssafy.domain.companion.service.CompanionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Tag(name = "Companion API")
@RestController
@RequestMapping("/api/companion")
@RequiredArgsConstructor
public class
CompanionController {
	private final CompanionService companionService;

	@Operation(summary = "동행 모집 생성", description = "동행 모집을 등록한다.")
	@PostMapping
	public ResponseEntity<CompanionResponse> create(@RequestBody CompanionCreateRequest companionCreateRequest, @AuthenticationPrincipal UserDetails userDetails){
		return ResponseEntity.ok(CompanionResponse.from(companionService.createCompanion(companionCreateRequest, userDetails.getUsername())));
	}

	@Operation(summary = "동행 모집 정보 수정", description = "동행 모집 정보를 수정한다")
	@PutMapping("/{companionId}")
	public ResponseEntity<CompanionResponse> update(@PathVariable Long companionId, @RequestBody CompanionUpdateRequest companionUpdateRequest){
		return ResponseEntity.ok(CompanionResponse.from(companionService.updateCompanion(companionUpdateRequest, companionId)));
	}

	@Operation(summary = "동행 모집 삭제", description = "동행 모집을 삭제한다")
	@DeleteMapping("/{companionId}")
	public ResponseEntity<Object> delete(@PathVariable Long companionId){
		companionService.deleteById(companionId);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "동행 모집 한 건 조회", description = "동행 모집 한 건의 정보를 조회한다")
	@GetMapping("/info/{companionId}")
	public ResponseEntity<CompanionResponse> getCompanionById(@PathVariable Long companionId) {
		return ResponseEntity.ok(CompanionResponse.from(companionService.findById(companionId)));
	}

	@Operation(summary = "동행 모집 전체 조회", description = "신청 가능한 동행 모집을 최신 등록 순으로 정렬한다.")
	@GetMapping
	public ResponseEntity<List<SimpleCompanionResponse>> companionList(@PageableDefault(page = 0, size = 6, sort = "createdTime", direction = Sort.Direction.DESC) Pageable pageable) {
		return ResponseEntity.ok(companionService.findPaging(pageable).stream().map(SimpleCompanionResponse::from).toList());
	}

	@Operation(summary = "동행 모집 검색", description = "검색 조건 기반(제목, 작성자, 내용, 티박스, 팔로우) 동행 모집 조회 결과를 최신 등록 순으로 정렬한다.")
	@PostMapping("/search")
	public ResponseEntity<Map<String, Object>> searchList(@RequestBody CompanionSearchRequest companionSearchRequest, @PageableDefault(page = 0, size = 6, sort = "createdTime", direction = Sort.Direction.DESC) Pageable pageable) {
		Page<Companion> paging = companionService.findPagingByKeyword(companionSearchRequest, pageable);

		Map<String, Object> response = new HashMap<>();
		response.put("companionList", paging.stream().map(SimpleCompanionResponse::from).toList());
		response.put("totalPages", paging.getTotalPages());

		return ResponseEntity.ok(response);
	}

	@Operation(summary = "참여 중인 동행 모집 조회", description = "사용자가 참여 중인 모든 동행 모집을 최신 등록 순으로 정렬한다.")
	@GetMapping("/participating")
	public ResponseEntity<List<SimpleCompanionResponse>> participatingList(@AuthenticationPrincipal UserDetails userDetails) {
		return ResponseEntity.ok(companionService.findParticipatingCompanionByCompanionUserMemberId(userDetails.getUsername()).stream().map(SimpleCompanionResponse::from).toList());
	}

	@Operation(summary = "사용자가 생성한 동행 모집 조회", description = "사용자가 생성한 동행 모집을 최신 등록 순으로 정렬한다.")
	@GetMapping("/created")
	public ResponseEntity<List<SimpleCompanionResponse>> createdList(@AuthenticationPrincipal UserDetails userDetails) {
		return ResponseEntity.ok(companionService.findCreatedCompanionByMemberId(userDetails.getUsername()).stream().map(SimpleCompanionResponse::from).toList());
	}

	@Operation(summary = "사용자가 다녀온 동행 모집 조회", description = "사용자가 다녀온 동행 모집을 최신 티업시간 순으로 정렬한다.")
	@GetMapping("/past/{memberId}")
	public ResponseEntity<List<SimpleCompanionResponse>> pastList(@PathVariable String memberId) {
		return ResponseEntity.ok(companionService.findPastByCompanionUserMemberId(memberId).stream().map(SimpleCompanionResponse::from).toList());
	}

	@Operation(summary = "동행 모집 인기 골프장 5개 조회", description = "동행 모집이 가장 많이 수행된 골프장 5개를 인기순으로 정렬한다.")
	@GetMapping("/field")
	public ResponseEntity<List<Integer>> fieldList() {
		return ResponseEntity.ok(companionService.findFieldOrderByCountDesc());
	}

	@Operation(summary = "메인 페이지 최신 동행 모집 5개 조회", description = "메인 페이지에 노출할 최근 동행 모집 5개를 조회한다.")
	@GetMapping("/main")
	public ResponseEntity<List<SimpleCompanionResponse>> mainList() {
		return ResponseEntity.ok(companionService.findOrderByCreatedTimeLimitFive().stream().map(SimpleCompanionResponse::from).toList());
	}
}
