package com.ssafy.domain.Companion.controller;

import com.ssafy.common.api.ApiResponse;
import com.ssafy.domain.Companion.dto.request.CompanionCreate;
import com.ssafy.domain.Companion.dto.request.CompanionSearch;
import com.ssafy.domain.Companion.dto.request.CompanionUpdate;
import com.ssafy.domain.Companion.dto.response.CompanionResponse;
import com.ssafy.domain.Companion.entity.Companion;
import com.ssafy.domain.Companion.service.CompanionService;
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

import java.util.List;

@Slf4j
@Tag(name = "Companion API")
@RestController
@RequestMapping("/companion")
@RequiredArgsConstructor
public class CompanionController {
	private final CompanionService companionService;

	//동행 모집 생성
	@Operation(summary = "동행 모집글 생성", description = "동행 모집을 위해 글을 작성한다.")
	@PostMapping("/article")
	public ResponseEntity<CompanionResponse> create(@RequestBody CompanionCreate companionCreate, @AuthenticationPrincipal UserDetails userDetails){
		return ResponseEntity.ok(CompanionResponse.from(companionService.createCompanion(companionCreate, userDetails.getUsername())));
	}

	@Operation(summary = "동행모집 정보 수정", description = "동행모집 글을 수정한다")
	@PutMapping("/{companionId}")
	public ResponseEntity<CompanionResponse> update(@PathVariable Long companionId, @RequestBody CompanionUpdate companionUpdate){
		return ResponseEntity.ok(CompanionResponse.from(companionService.updateCompanion(companionUpdate, companionId)));
	}

	@Operation(summary = "동행 모집 삭제", description = "동행 모집 글을 삭제한다")
	@DeleteMapping("/deleteAll")
	public ResponseEntity<Object> delete(@PathVariable Long companionId){
		companionService.deleteCompanion(companionId);
		return ResponseEntity.ok().build();
	}

	//companion 을 프런트 단에 보내는 것 - 컴패니언 전체 다 보여주는
	// 동행 모집 정보 조회
	@Operation(summary = "동행 모집 정보 조회", description = "동행 모집 정보를 조회한다")
	@GetMapping("/{companionId}")
	public ResponseEntity<CompanionResponse> getCompanionById(@PathVariable Long companionId) {
		Companion companion = companionService.findByCompanionId(companionId);
		return ResponseEntity.ok(CompanionResponse.from(companion));
	}

	//동행 모집 목록 가져오기 (페이징 된 애들 다 )
//	@Operation(summary = "동행 정보 조회", description = "동행 모집 정보를 조회한다.")
//	@GetMapping("/{companionId}")
//		public ResponseEntity<List<CompanionResponse>> companionList(@PathVariable Long companionId, @PageableDefault(page = 0, size = 6, sort = "createdTime", direction = Sort.Direction.DESC) Pageable pageable) {
//			Page<Companion> companionPage = companionService.findPaging(pageable, CompanionSearch);
//	}

	//전체 동행 모집 페이징 - 최신 등록 순 (키워드 검색)
	@Operation(summary = "검색 기반 동행 모집 조회 - 최신 등록순", description = "키워드 검색 기준 별 결과를 최신 등록 순으로 정렬한다.")
	@PostMapping("/keywords")
	public ResponseEntity<List<CompanionResponse>> searchList(@RequestBody CompanionSearch companionSearch, @PageableDefault(page = 0, size = 6, sort = "createdTime", direction = Sort.Direction.DESC) Pageable pageable) {
		Page<Companion> paging = companionService.findByKeyword(pageable, companionSearch);
		return ResponseEntity.ok(paging.stream().map(CompanionResponse::from).toList());
	}

	//동행 모집 페이징 - 최신 등록 순 (티박스)
	@Operation(summary = "티박스 타입 기반 동행 모집 조회 - 최신 등록순", description = "티박스 타입별로 동행 모집 글을 검색하고 최신 등록 순으로 정렬한다.")
	@PostMapping("/companion/{teebox}")
	public ResponseEntity<List<CompanionResponse>> teeboxList(@PathVariable String teebox, @PageableDefault(page = 0,  size = 6, sort = "createdTime", direction = Sort.Direction.DESC) Pageable pageable) {
		Page<Companion> paging = companionService.findByTeeBox(pageable, teebox);
		return ResponseEntity.ok(paging.stream().map(CompanionResponse::from).toList());
	}


	//동행 모집 페이징 - 최신 등록 순 (팔로워)
	@Operation(summary = "팔로워별 동행 모집 조회 - 최신 등록순", description = "특정 사용자(팔로워)가 작성한 동행 모집 글을 검색하고 최신 등록 순으로 정렬한다.")
	@GetMapping("/follower/{followerId}")
	public ResponseEntity<List<CompanionResponse>> findByFollowerId(@PathVariable String followerId, @PageableDefault(page = 0, size = 6, sort = "createdTime", direction = Sort.Direction.DESC) Pageable pageable) {
		Page<Companion> paging = companionService.findByFollowerId(pageable, followerId);
		return ResponseEntity.ok(paging.stream().map(CompanionResponse::from).toList());
	}


	// 동행 모집 참가자 증가
	@Operation(summary = "동행 모집 참가자 증가", description = "동행 모집에 참가자를 추git 가하고 현재 참가 인원을 증가한다")
	@PostMapping("/{companionId}/join")
	public ResponseEntity<CompanionResponse> joinCompanion(@PathVariable Long companionId, @PathVariable Long companionUserId) {
		Companion companion = companionService.acceptCompanionUser(companionId, companionUserId);
		return ResponseEntity.ok(CompanionResponse.from(companion));
	}

	// 동행 모집 참가자 감소
	@Operation(summary = "동행 모집 참가자 감소", description = "동행 모집 참가자를 감소시킨다")
	@DeleteMapping("/{companionId}/leave")
	public ResponseEntity<Object> leaveCompanion(@PathVariable Long companionId) {
		companionService.subCompanionUser(companionId);
		return ResponseEntity.ok().build();
	}






}
