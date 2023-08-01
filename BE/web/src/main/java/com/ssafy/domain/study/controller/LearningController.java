package com.ssafy.domain.study.controller;

import com.ssafy.domain.study.dto.request.LearningCreateRequest;
import com.ssafy.domain.study.dto.request.LearningUpdateRequest;
import com.ssafy.domain.study.dto.response.LearningResponse;
import com.ssafy.domain.study.service.LearningService;
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
@Tag(name = "Learning API")
@RestController
@RequiredArgsConstructor
public class LearningController {
    private final LearningService learningService;

    @Operation(summary = "러닝 생성", description = "러닝을 생성한다.")
    @PostMapping("/study/learning")
    public ResponseEntity<LearningResponse> learningCreate(@RequestBody LearningCreateRequest learningCreateRequest, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(LearningResponse.from(learningService.create(learningCreateRequest, userDetails.getUsername())));
    }

    @Operation(summary = "러닝 정보 수정", description = "러닝 정보를 수정한다.")
    @PutMapping("/study/learning/{studyId}")
    public ResponseEntity<LearningResponse> coachingUpdate(@PathVariable Long studyId, @RequestBody LearningUpdateRequest learningUpdateRequest) {
        return ResponseEntity.ok(LearningResponse.from(learningService.update(learningUpdateRequest, studyId)));
    }

    @Operation(summary = "러닝 삭제", description = "러닝을 삭제한다.")
    @DeleteMapping("/study/learning/{studyId}")
    public ResponseEntity<Object> coachingDelete(@PathVariable Long studyId) {
        learningService.deleteById(studyId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "전체 러닝 조회 - 최신 등록 순", description = "전체 러닝을 최신 등록 순으로 정렬한다.")
    @GetMapping("/study/learning")
    public ResponseEntity<List<LearningResponse>> coachingListByCreatedTimeDesc() {
        return ResponseEntity.ok(learningService.findAllByCreatedTimeDesc().stream().map(LearningResponse::from).toList());
    }
}
