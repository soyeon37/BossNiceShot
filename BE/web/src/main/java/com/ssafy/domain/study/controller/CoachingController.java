package com.ssafy.domain.study.controller;

import com.ssafy.domain.study.dto.request.CoachingCreateRequest;
import com.ssafy.domain.study.dto.request.CoachingUpdateRequest;
import com.ssafy.domain.study.dto.response.CoachingResponse;
import com.ssafy.domain.study.entity.Coaching;
import com.ssafy.domain.study.service.CoachingService;
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
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Slf4j
@Tag(name = "Coaching API")
@RestController
@RequiredArgsConstructor
public class CoachingController {
    private final CoachingService coachingService;

    @Operation(summary = "코칭 생성", description = "코칭을 생성한다.")
    @PostMapping("/study/coaching")
    public ResponseEntity<CoachingResponse> coachingCreate(@RequestBody CoachingCreateRequest coachingCreateRequest, @AuthenticationPrincipal Principal principal) {
        return ResponseEntity.ok(CoachingResponse.from(coachingService.create(coachingCreateRequest, principal.getName())));
    }

    @Operation(summary = "코칭 정보 수정", description = "코칭 정보를 수정한다.")
    @PutMapping("/study/coaching/{studyId}")
    public ResponseEntity<CoachingResponse> coachingUpdate(@PathVariable Long studyId, @RequestBody CoachingUpdateRequest coachingUpdateRequest) {
        return ResponseEntity.ok(CoachingResponse.from(coachingService.update(coachingUpdateRequest, studyId)));
    }

    @Operation(summary = "코칭 삭제", description = "코칭을 삭제한다.")
    @DeleteMapping("/study/coaching/{studyId}")
    public ResponseEntity<Object> coachingDelete(@PathVariable Long studyId) {
        coachingService.deleteById(studyId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "전체 코칭 조회 - 최신 등록 순", description = "전체 코칭을 최신 등록 순으로 정렬한다.")
    @GetMapping("/study/coaching")
    public ResponseEntity<List<CoachingResponse>> coachingListByCreatedTimeDesc(@PageableDefault(page = 0, size = 6, sort = "createdTime", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Coaching> paging = coachingService.findPaging(pageable);
        return ResponseEntity.ok(paging.stream().map(CoachingResponse::from).toList());
    }
}
