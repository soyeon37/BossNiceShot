package com.ssafy.domain.Companion.controller;

import com.ssafy.domain.Companion.service.CompanionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "Companion API")
@RestController
@RequestMapping("/companion")
@RequiredArgsConstructor
public class CompanionController {
	private final CompanionService companionService;

	//동행 모집 생성

	//동행 모집 정보 수정


	//동행 모집 글 삭제

	//전체 동행 모집 조회 - 최신 등록 순








}
