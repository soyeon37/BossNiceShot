package com.ssafy.domain.companion.controller;

import com.ssafy.domain.companion.dto.request.CompanionChatRequest;
import com.ssafy.domain.companion.dto.response.CompanionChatResponse;
import com.ssafy.domain.companion.service.CompanionChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@Tag(name = "CompanionChat API")
@RestController
@RequiredArgsConstructor
public class CompanionChatController {
    private final SimpMessageSendingOperations sendingOperations;
    private final CompanionChatService companionChatService;

    @Operation(summary = "메세지 전송", description = "메세지를 전송한다.")
    @MessageMapping("/chat")
    public void sendMessage(CompanionChatRequest companionChatRequest) {
        CompanionChatResponse companionChatResponse = CompanionChatResponse.from(companionChatService.insert(companionChatRequest));
        sendingOperations.convertAndSend("/sub/chat/" + companionChatResponse.companionId(), companionChatResponse);
    }

    @Operation(summary = "채팅 방 내 전체 메세지 조회", description = "특정 채팅 방 내 전체 메세지를 보낸 시간 오름차순으로 정렬한다.")
    @GetMapping("/api/companion/chat/{companionId}")
    public ResponseEntity<List<CompanionChatResponse>> messageList(@PathVariable Long companionId) {
        return ResponseEntity.ok(companionChatService.findByCompanionId(companionId).stream().map(CompanionChatResponse::from).toList());
    }

    @Operation(summary = "채팅 방 내 전체 메세지 삭제", description = "특정 채팅 방 내 전체 메세지를 삭제한다.")
    @DeleteMapping("/api/companion/chat/{companionId}")
    public ResponseEntity<Object> deleteByCompanionId(@PathVariable Long companionId) {
        companionChatService.deleteByCompanionId(companionId);
        return ResponseEntity.ok().build();
    }
}
