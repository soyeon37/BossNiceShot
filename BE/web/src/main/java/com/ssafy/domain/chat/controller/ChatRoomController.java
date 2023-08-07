package com.ssafy.domain.chat.controller;

import com.ssafy.domain.chat.dto.request.ChatRoomRequest;
import com.ssafy.domain.chat.dto.response.ChatRoomResponse;
import com.ssafy.domain.chat.service.ChatRoomService;
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
@Tag(name = "ChatRoom API")
@RestController
@RequestMapping("/chat/room")
@RequiredArgsConstructor
public class ChatRoomController {
    private final ChatRoomService chatRoomService;

    @Operation(summary = "사용자의 전체 채팅방 조회", description = "사용자가 참여한 모든 채팅방을 조회한다.")
    @GetMapping
    public ResponseEntity<List<ChatRoomResponse>> chatRoomList(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(chatRoomService.findByChatRoomUserMemberId(userDetails.getUsername()).stream().map(ChatRoomResponse::from).toList());
    }

    @Operation(summary = "채팅방 생성", description = "채팅방을 생성한다.")
    @PostMapping
    public ResponseEntity<ChatRoomResponse> create(@RequestBody ChatRoomRequest chatRoomRequest, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ChatRoomResponse.from(chatRoomService.save(chatRoomRequest, userDetails.getUsername())));
    }

    @Operation(summary = "채팅방 삭제", description = "채팅방을 삭제한다.")
    @DeleteMapping("/{chatRoomId}")
    public ResponseEntity<Object> delete(@PathVariable Long chatRoomId) {
        chatRoomService.deleteById(chatRoomId);
        return ResponseEntity.ok().build();
    }
}
