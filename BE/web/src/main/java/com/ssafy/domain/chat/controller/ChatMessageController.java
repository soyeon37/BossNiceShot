package com.ssafy.domain.chat.controller;

import com.ssafy.domain.chat.dto.request.ChatMessageRequest;
import com.ssafy.domain.chat.dto.response.ChatMessageResponse;
import com.ssafy.domain.chat.service.ChatMessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Tag(name = "ChatMessage API")
@RestController
@RequiredArgsConstructor
public class ChatMessageController {
    private final SimpMessageSendingOperations sendingOperations;
    private final ChatMessageService chatMessageService;

    @Operation(summary = "메세지 전송", description = "메세지를 전송한다.")
    @MessageMapping("/chat/message")
    public void sendMessage(ChatMessageRequest chatMessageRequest) {
        ChatMessageResponse chatMessageResponse = ChatMessageResponse.from(chatMessageService.insert(chatMessageRequest));
        sendingOperations.convertAndSend("/sub/chat/message/" + chatMessageResponse.chatRoomId(), chatMessageResponse);
    }

    @Operation(summary = "채팅 방 내 전체 메세지 조회", description = "특정 채팅 방 내 전체 메세지를 보낸 시간 오름차순으로 정렬한다.")
    @GetMapping("/chat/message/{chatRoomId}")
    public ResponseEntity<List<ChatMessageResponse>> messageList(@PathVariable Long chatRoomId) {
        return ResponseEntity.ok(chatMessageService.findByChatRoomIdAsc(chatRoomId).stream().map(ChatMessageResponse::from).toList());
    }

    @Operation(summary = "채팅 방 내 전체 메세지 삭제", description = "특정 채팅 방 내 전체 메세지를 삭제한다.")
    @DeleteMapping("/chat/message/{chatRoomId}")
    public ResponseEntity<Object> deleteByChatRoomId(@PathVariable Long chatRoomId) {
        chatMessageService.deleteByChatRoomId(chatRoomId);
        return ResponseEntity.ok().build();
    }
}
