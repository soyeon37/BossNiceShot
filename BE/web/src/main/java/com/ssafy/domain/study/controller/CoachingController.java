package com.ssafy.domain.study.controller;

import com.ssafy.domain.study.dto.request.CoachingCreateRequest;
import com.ssafy.domain.study.dto.request.CoachingUpdateRequest;
import com.ssafy.domain.study.dto.response.CoachingResponse;
import com.ssafy.domain.study.repository.CoachingRepository;
import com.ssafy.domain.study.service.CoachingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Slf4j
@Tag(name = "Coaching API")
@RestController
@RequestMapping("/study/coaching")
@RequiredArgsConstructor
public class CoachingController {
    private final CoachingService coachingService;

    @Operation(summary = "코칭 생성", description = "코칭을 등록한다.")
    @PostMapping
    public ResponseEntity<CoachingResponse> coachingCreate(@RequestBody CoachingCreateRequest coachingCreateRequest, @AuthenticationPrincipal Principal principal) {
        return ResponseEntity.ok(CoachingResponse.from(coachingService.create(coachingCreateRequest, principal.getName())));
    }

    @Operation(summary = "코칭 정보 수정", description = "코칭 정보를 수정한다.")
    @PutMapping("/{studyId}")
    public ResponseEntity<CoachingResponse> coachingUpdate(@PathVariable Long studyId, @RequestBody CoachingUpdateRequest coachingUpdateRequest) {
        return ResponseEntity.ok(CoachingResponse.from(coachingService.update(coachingUpdateRequest, studyId)));
    }

    @Operation(summary = "코칭 삭제", description = "코칭을 삭제한다.")
    @DeleteMapping("/{studyId}")
    public ResponseEntity<Object> coachingDelete(@PathVariable Long studyId) {
        coachingService.deleteById(studyId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "전체 코칭 조회 - 최신 등록 순", description = "전체 코칭을 최신 등록 순으로 정렬한다.")
    @GetMapping
    public ResponseEntity<List<CoachingResponse>> coachingListByCreatedTimeDesc() {
        return ResponseEntity.ok(coachingService.findAllByCreatedTimeDesc().stream().map(CoachingResponse::from).toList());
    }

    @Operation(summary = "참여 가능한 코칭 조회", description = "참여 가능한 코칭을 최신 시작순으로 정렬한다.")
    @GetMapping
    public ResponseEntity<List<CoachingResponse>> enableCoachingList() {
        return ResponseEntity.ok(coachingService.findEnableCoaching().stream().map(CoachingResponse::from).toList());
    }

    @Operation(summary = "키워드 기반 코칭 검색 - 제목", description = "제목에 키워드가 포함된 코칭을 최신 등록순을 정렬한다.")
    @GetMapping("/search/title/{keyword}")
    public ResponseEntity<List<CoachingResponse>> searchListByTitleKeyword(@PathVariable String keyword) {
        return ResponseEntity.ok(coachingService.findByTitleContaining(keyword).stream().map(CoachingResponse::from).toList());
    }

    @Operation(summary = "키워드 기반 코칭 검색 - 제목", description = "제목에 키워드가 포함된 코칭을 최신 등록순을 정렬한다.")
    @GetMapping("/search/member/{keyword}")
    public ResponseEntity<List<CoachingResponse>> searchListByMemberKeyword(@PathVariable String keyword) {
        return ResponseEntity.ok(coachingService.findByTitleContaining(keyword).stream().map(CoachingResponse::from).toList());
    }
}
