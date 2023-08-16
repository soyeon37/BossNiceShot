package com.ssafy.domain.study.controller;

import com.ssafy.domain.study.dto.request.StudyUserRequest;
import com.ssafy.domain.study.dto.response.StudyUserResponse;
import com.ssafy.domain.study.service.StudyUserService;
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
@Tag(name = "StudyUser API")
@RestController
@RequestMapping("/api/study/user")
@RequiredArgsConstructor
public class StudyUserController {
    private final StudyUserService studyUserService;

    @Operation(summary = "스터디 사용자 조회", description = "스터디룸에 있는 전체 사용자를 조회한다.")
    @GetMapping("/{studyId}")
    public ResponseEntity<List<StudyUserResponse>> userList(@PathVariable Long studyId) {
        return ResponseEntity.ok(studyUserService.findByStudyId(studyId).stream().map(StudyUserResponse::from).toList());
    }


    @Operation(summary = "스터디룸에 유저 입장", description = "스터디룸에 유저가 입장한다.")
    @PostMapping
    public ResponseEntity<StudyUserResponse> enter(@RequestBody StudyUserRequest studyUserRequest, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(StudyUserResponse.from(studyUserService.save(studyUserRequest, userDetails.getUsername())));
    }

    @Operation(summary = "스터디룸에서 유저 퇴장", description = "스터디룸에서 유저가 퇴장한다.")
    @DeleteMapping("/{studyId}")
    public ResponseEntity<Object> exit(@PathVariable Long studyId, @AuthenticationPrincipal UserDetails userDetails) {
        studyUserService.deleteByStudyIdAndMemberId(studyId, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "스터디룸에 속한 유저 삭제", description = "스터디룸에 있는 모든 유저를 삭제한다.")
    @DeleteMapping("/{studyId}/all")
    public ResponseEntity<Object> deleteByStudyId(@PathVariable Long studyId) {
        studyUserService.deleteByStudyId(studyId);

        return ResponseEntity.ok().build();
    }
}
