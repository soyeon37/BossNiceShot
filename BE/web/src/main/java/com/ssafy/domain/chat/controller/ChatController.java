package com.ssafy.domain.chat.controller;

import com.ssafy.domain.chat.dto.request.ChatMessageRequest;
import com.ssafy.domain.chat.dto.request.ChatParticipantRequest;
import com.ssafy.domain.chat.dto.request.ChatRoomRequest;
import com.ssafy.domain.chat.dto.response.ChatMessageResponse;
import com.ssafy.domain.chat.dto.response.ChatParticipantResponse;
import com.ssafy.domain.chat.dto.response.ChatRoomResponse;
import com.ssafy.domain.chat.entity.ChatParticipant;
import com.ssafy.domain.chat.entity.ChatRoom;
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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
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

    /**
     *  채팅방 참여자
     **/
    @Operation(summary = "채팅방 내 전체 사용자 조회", description = "채팅방 내 전체 사용자 조회")
    @GetMapping("/chat/participant/{roomId}")
    public ResponseEntity<List<ChatParticipantResponse>> memberList(@PathVariable Long roomId) {
        return ResponseEntity.ok(chatParticipantService.findAllByRoomId(roomId).stream().map(ChatParticipantResponse::from).toList());
    }

    @Operation(summary = "사용자의 전체 채팅방 조회", description = "사용자의 전체 채팅방 조회")
    @GetMapping("/chat/participant/rooms")
    public ResponseEntity<List<ChatRoomResponse>> roomList(@AuthenticationPrincipal Principal principal) {
        List<ChatParticipant> chatParticipants = chatParticipantService.findAllByMemberId(principal.getName());

        List<ChatRoom> chatRooms = new ArrayList<>();
        for (ChatParticipant chatParticipant:chatParticipants) {
            chatRooms.add(chatRoomService.findById(chatParticipant.getId()));
        }

        return ResponseEntity.ok(chatRooms.stream().map(ChatRoomResponse::from).toList());
    }

    @Operation(summary = "채팅방에 사용자 추가", description = "채팅방에 사용자 추가")
    @PostMapping("/chat/participant")
    public ResponseEntity<ChatParticipantResponse> joinChatRoom(@RequestBody ChatParticipantRequest chatParticipantRequest) {
        return ResponseEntity.ok(ChatParticipantResponse.from(chatParticipantService.save(chatParticipantRequest)));
    }

    // 동행 모집 API 완성 후 수정 필요
    @Operation(summary = "채팅방에서 사용자 제거", description = "채팅방에서 사용자 제거")
    @DeleteMapping("/chat/participant/{roomId}")
    public ResponseEntity<Object> leaveChatRoom(@PathVariable Long roomId, @AuthenticationPrincipal Principal principal) {
        chatParticipantService.delete(roomId, principal.getName());
        return ResponseEntity.ok().build();
    }

    /**
     *  채팅 메세지
     **/
    @Operation(summary = "메세지 전송", description = "메세지 전송")
    @MessageMapping("/chat/message")
    public void sendMessage(ChatMessageRequest chatMessageRequest) {
        ChatMessageResponse chatMessageResponse = ChatMessageResponse.from(chatMessageService.save(chatMessageRequest));
        sendingOperations.convertAndSend("/topic/chat/room/" + chatMessageResponse.roomId(), chatMessageResponse);
    }

    @Operation(summary = "채팅 방 내 전체 메세지 조회", description = "특정 채팅 방 내 전체 메세지를 보낸 시간 오름차순으로 정렬")
    @GetMapping("/chat/message/{roomId}")
    public ResponseEntity<List<ChatMessageResponse>> messageList(@PathVariable Long roomId) {
        return ResponseEntity.ok(chatMessageService.findAllByChatRoomIdAsc(roomId).stream().map(ChatMessageResponse::from).toList());
    }

    /**
     *  채팅방
     **/
    @Operation(summary = "전체 채팅 방 조회", description = "전체 채팅 방을 생성 시간 내림차순으로 정렬")
    @GetMapping("/chat/room")
    public ResponseEntity<List<ChatRoomResponse>> roomList() {
        return ResponseEntity.ok(chatRoomService.findAll().stream().map(ChatRoomResponse::from).toList());
    }

    @Operation(summary = "특정 채팅방 정보 조회", description = "특정 채팅방 조회")
    @GetMapping("/chat/room/{roomId}")
    public ResponseEntity<ChatRoomResponse> roomInfo(@PathVariable Long roomId) {
        return ResponseEntity.ok(ChatRoomResponse.from(chatRoomService.findById(roomId)));
    }

    @Operation(summary = "채팅방 생성", description = "채팅방 생성")
    @PostMapping("/chat/room")
    public ResponseEntity<ChatRoomResponse> createRoom(@RequestBody ChatRoomRequest chatRoomRequest) {
        return ResponseEntity.ok(ChatRoomResponse.from(chatRoomService.save(chatRoomRequest)));
    }

    @Operation(summary = "채팅방 삭제", description = "채팅방 내 전체 채팅 메세지 삭제 후 채팅방 삭제")
    @DeleteMapping("/chat/room/{roomId}")
    public ResponseEntity<Object> deleteRoom(@PathVariable Long roomId) {
        chatMessageService.deleteByChatRoomId(roomId);
        chatRoomService.delete(roomId);
        return ResponseEntity.ok().build();
    }
}
