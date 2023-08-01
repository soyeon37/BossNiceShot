package com.ssafy.domain.study.controller;

import com.ssafy.domain.study.dto.request.StudyUserRequest;
import com.ssafy.domain.study.dto.response.CoachingUserResponse;
import com.ssafy.domain.study.dto.response.LearningUserResponse;
import com.ssafy.domain.study.service.StudyUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "StudyUser API")
@RestController
@RequiredArgsConstructor
public class StudyUserController {
    private final StudyUserService studyUserService;

    @Operation(summary = "코칭룸에 유저 입장", description = "코칭룸에 유저가 입장한다.")
    @PostMapping("/study/coaching/user")
    public ResponseEntity<CoachingUserResponse> coachingRoomEnter(@RequestBody StudyUserRequest studyUserRequest, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(CoachingUserResponse.from(studyUserService.createCoachingUser(studyUserRequest, userDetails.getUsername())));
    }

    @Operation(summary = "러닝룸에 유저 입장", description = "러닝룸에 유저가 입장한다.")
    @PostMapping("/study/learning/user")
    public ResponseEntity<LearningUserResponse> learningRoomEnter(@RequestBody StudyUserRequest studyUserRequest, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(LearningUserResponse.from(studyUserService.createLearningUser(studyUserRequest, userDetails.getUsername())));
    }
}
