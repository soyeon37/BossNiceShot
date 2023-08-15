package com.ssafy.domain.follow.controller;

import com.ssafy.domain.follow.dto.response.FollowResponse;
import com.ssafy.domain.follow.dto.request.FollowRequest;
import com.ssafy.domain.follow.service.FollowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

@Slf4j
@Tag(name = "Follow API")
@RestController
@RequestMapping("/api/follow")
@RequiredArgsConstructor
public class FollowController {
    private final FollowService followService;

    @Operation(summary = "팔로우 목록 조회", description = "사용자의 팔로우 목록을 조회한다.")
    @GetMapping
    public ResponseEntity<List<FollowResponse>> followList(@AuthenticationPrincipal UserDetails userDetails) {
        log.info("팔로우 목록 조회 - id = {}", userDetails.getUsername());
        return ResponseEntity.ok(followService.findAllByFollowerId(userDetails.getUsername()).stream().map(FollowResponse::from).sorted(Comparator.comparing(FollowResponse::followeeNickname)).toList());
    }

    @Operation(summary = "팔로우 상태 확인", description = "특정 사용자에 대한 팔로우 유무를 확인한다.")
    @GetMapping("/{followeeId}")
    public ResponseEntity<Boolean> checkFollowing(@AuthenticationPrincipal UserDetails userDetails, @PathVariable String followeeId) {
        log.info("팔로우 상태 확인 - follower_id = {}, followee_id = {}", userDetails.getUsername(), followeeId);
        return ResponseEntity.ok(followService.checkFollowing(userDetails.getUsername(), followeeId));
    }

    @Operation(summary = "팔로우", description = "사용자가 다른 사용자를 팔로우한다.")
    @PostMapping
    public ResponseEntity<FollowResponse> follow(@AuthenticationPrincipal UserDetails userDetails, @RequestBody FollowRequest followRequest) {
        log.info("팔로우 - follower_id = {}, followee_id = {}", userDetails.getUsername(), followRequest.followeeId());
        return ResponseEntity.ok(FollowResponse.from(followService.save(userDetails.getUsername(), followRequest)));
    }

    @Operation(summary = "언팔로우", description = "사용자가 다른 사용자를 언팔로우한다.")
    @DeleteMapping("/{followerId}")
    public ResponseEntity<Object> unfollow(@AuthenticationPrincipal UserDetails userDetails, @PathVariable String followeeId) {
        log.info("언팔로우 - follower_id = {}, followee_id = {}", userDetails.getUsername(), followeeId);
        followService.delete(userDetails.getUsername(), followeeId);
        return ResponseEntity.ok().build();
    }
}
