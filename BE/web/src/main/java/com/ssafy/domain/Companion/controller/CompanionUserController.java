package com.ssafy.domain.Companion.controller;

import com.ssafy.domain.Companion.service.CompanionUserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "CompanionUser API")
@RestController
@RequestMapping("/companion/user")
@RequiredArgsConstructor
public class CompanionUserController {
	private final CompanionUserService companionUserService;

    //동행 신청 오면 수락
    //동행 신청 오면 거절
}
