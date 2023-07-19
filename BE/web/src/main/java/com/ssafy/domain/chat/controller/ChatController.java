package com.ssafy.domain.chat.controller;

import com.ssafy.domain.chat.dto.request.ChatMessageRequest;
import com.ssafy.domain.chat.dto.request.ChatParticipantRequest;
import com.ssafy.domain.chat.dto.request.ChatRoomRequest;
import com.ssafy.domain.chat.dto.response.ChatMessageResponse;
import com.ssafy.domain.chat.dto.response.ChatParticipantResponse;
import com.ssafy.domain.chat.dto.response.ChatRoomResponse;
import com.ssafy.domain.chat.service.ChatMessageService;
import com.ssafy.domain.chat.service.ChatParticipantService;
import com.ssafy.domain.chat.service.ChatRoomService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Tag(name = "Chat API")
@RestController
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessageSendingOperations sendingOperations;
    private final ChatMessageService chatMessageService;
    private final ChatRoomService chatRoomService;
    private final ChatParticipantService chatParticipantService;

    @PostMapping("/chat/participant")
    public ResponseEntity<ChatParticipantResponse> enter(@RequestBody ChatParticipantRequest chatParticipantRequest) {
        return ResponseEntity.ok(ChatParticipantResponse.from(chatParticipantService.save(chatParticipantRequest)));
    }

    // delete 작성
    
    @Operation(summary = "메세지 전송", description = "메세지 전송")
    @MessageMapping("/chat/message")
    public void sendMessage(ChatMessageRequest chatMessageRequest) {
        ChatMessageResponse chatMessageResponse = chatMessageService.findById(chatMessageService.save(chatMessageRequest));

        sendingOperations.convertAndSend("/topic/chat/room/" + chatMessageRequest.roomId(), chatMessageResponse);
    }

    @Operation(summary = "채팅 방 내 전체 메세지 조회", description = "특정 채팅 방 내 전체 메세지를 보낸 시간 오름차순으로 정렬")
    @GetMapping("/chat/room/{roomId}")
    public ResponseEntity<List<ChatMessageResponse>> allMessages(@PathVariable Long roomId) {
        return ResponseEntity.ok(chatMessageService.findAllByChatRoomIdAsc(roomId));
    }

    @Operation(summary = "전체 채팅 방 조회", description = "전체 채팅 방을 생성 시간 내림차순으로 정렬")
    @GetMapping("/chat/room")
    public ResponseEntity<List<ChatRoomResponse>> allRooms() {
        return ResponseEntity.ok(chatRoomService.findAll());
    }

    @Operation(summary = "채팅 방 생성", description = "채팅 방 생성")
    @PostMapping("/chat/room")
    public ResponseEntity<ChatRoomResponse> createRoom(@RequestBody ChatRoomRequest chatRoomRequest) {
        return ResponseEntity.ok(chatRoomService.findById(chatRoomService.save(chatRoomRequest)));
    }

    @Operation(summary = "채팅 방 삭제", description = "채팅 방 삭제")
    @DeleteMapping("/chat/room/{roomId}")
    public ResponseEntity<Object> deleteRoom(@PathVariable Long roomId) {
        chatRoomService.delete(roomId);
        return ResponseEntity.ok().build();
    }
}
