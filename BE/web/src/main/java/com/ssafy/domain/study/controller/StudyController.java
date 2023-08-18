package com.ssafy.domain.study.controller;

import com.ssafy.domain.study.dto.request.StudyCreateRequest;
import com.ssafy.domain.study.dto.request.StudySearchRequest;
import com.ssafy.domain.study.dto.request.StudyUpdateRequest;
import com.ssafy.domain.study.dto.request.StudyTypeRequest;
import com.ssafy.domain.study.dto.response.StudyResponse;
import com.ssafy.domain.study.entity.Study;
import com.ssafy.domain.study.service.StudyService;
import io.openvidu.java.client.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Tag(name = "Study API")
@RestController
@RequestMapping
@RequiredArgsConstructor
public class StudyController {
    private final StudyService studyService;

    @Value("https://i9a309.p.ssafy.io:8443")
    private String OPENVIDU_URL;
    @Value("ssafy")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }
    @PostMapping("/api/sessions")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);

        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }

    @PostMapping("/api/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

    @Operation(summary = "스터디 한 건 조회", description = "스터디를 한 건 조회한다.")
    @GetMapping("/api/study/info/{studyId}")
    public ResponseEntity<StudyResponse> info(@PathVariable Long studyId) {
        return ResponseEntity.ok(StudyResponse.from(studyService.findById(studyId)));
    }

    @Operation(summary = "스터디 생성", description = "스터디를 생성한다.")
    @PostMapping("/api/study")
    public ResponseEntity<StudyResponse> create(@RequestBody StudyCreateRequest studyCreateRequest, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(StudyResponse.from(studyService.create(studyCreateRequest, userDetails.getUsername())));
    }

    @Operation(summary = "스터디 정보 수정", description = "스터디 정보를 수정한다.")
    @PutMapping("/api/study/{studyId}")
    public ResponseEntity<StudyResponse> update(@PathVariable Long studyId, @RequestBody StudyUpdateRequest studyUpdateRequest) {
        return ResponseEntity.ok(StudyResponse.from(studyService.update(studyUpdateRequest, studyId)));
    }

    @Operation(summary = "스터디 삭제", description = "스터디를 삭제한다.")
    @DeleteMapping("/api/study/{studyId}")
    public ResponseEntity<Object> delete(@PathVariable Long studyId) {
        studyService.deleteById(studyId);
        return ResponseEntity.ok().build();
    }
    @Operation(summary = "스터디 활성화", description = "방장이 스터디룸을 열어 스터디가 활성화된다.")
    @PutMapping("/api/study/{studyId}/active")
    public ResponseEntity<StudyResponse> active(@PathVariable Long studyId) {
        return ResponseEntity.ok(StudyResponse.from(studyService.active(studyId)));
    }

    @Operation(summary = "전체 스터디 조회 - 최신 등록 순", description = "타입 별로 전체 스터디를 최신 등록 순으로 정렬한다.")
    @PostMapping("/api/study/allsearch")
    public ResponseEntity<Map<String, Object>> studyList(@RequestBody StudyTypeRequest studyTypeRequest, @PageableDefault(page = 0, size = 6, sort = "createdTime", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Study> paging = studyService.findPaging(pageable, studyTypeRequest.type());
        log.info("전체 스터디 조회 시작 = {}", studyTypeRequest.type());
        Map<String, Object> response = new HashMap<>();
        response.put("studyList", paging.stream().map(StudyResponse::from).toList());
        response.put("totalPages", paging.getTotalPages());

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "검색 기반 스터디 조회", description = "타입 별로 검색 결과를 최신 등록 순으로 정렬한다.")
    @PostMapping("/api/study/list/{type}")
    public ResponseEntity<Map<String, Object>> searchList(@RequestBody StudySearchRequest studySearchRequest, @PathVariable String type, @PageableDefault(page = 0, size = 6, sort = "createdTime", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Study> paging = studyService.findByKeyword(pageable, type, studySearchRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("studyList", paging.stream().map(StudyResponse::from).toList());
        response.put("totalPages", paging.getTotalPages());

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "참여 가능한 코칭 조회", description = "활성화된 코칭 중, 참가 인원이 코칭의 최대 인원보다 작은 코칭을 최신 등록 순으로 정렬한다.")
    @GetMapping("/api/study/list/{type}/attandable")
    public ResponseEntity<Map<String, Object>> attandableList(@PathVariable String type, @PageableDefault(page = 0, size = 6, sort = "createdTime", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Study> paging = studyService.findPagingAttandableCoaching(pageable, type);

        Map<String, Object> response = new HashMap<>();
        response.put("studyList", paging.stream().map(StudyResponse::from).toList());
        response.put("totalPages", paging.getTotalPages());

        return ResponseEntity.ok(response);
    }
    @Operation(summary = "검색 기반 참여 가능한 코칭 조회 - 최신 등록 순", description = "활성화된 코칭 중, 참가 인원이 코칭의 최대 인원보다 작은 코칭 검색 결과를 최신 등록 순으로 정렬한다.")
    @PostMapping("/api/study/list/{type}/attandable")
    public ResponseEntity<Map<String, Object>> attandableSearchList(@RequestBody StudySearchRequest studySearchRequest, @PathVariable String type, @PageableDefault(page = 0, size = 6, sort = "createdTime", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Study> paging = studyService.findAttandableCoachingByKeyword(pageable, type, studySearchRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("studyList", paging.stream().map(StudyResponse::from).toList());
        response.put("totalPages", paging.getTotalPages());

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "메인 페이지 최신 스터디 5개 조회", description = "메인 페이지에 노출할 최근 스터디 5개를 조회한다.")
    @GetMapping("/api/study/main")
    public ResponseEntity<List<StudyResponse>> mainList() {
        return ResponseEntity.ok(studyService.findOrderByCreatedTimeLimitFive().stream().map(StudyResponse::from).toList());
    }
}