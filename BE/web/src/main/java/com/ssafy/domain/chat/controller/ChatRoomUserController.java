package com.ssafy.domain.chat.controller;

import com.ssafy.domain.chat.dto.request.ChatRoomUserRequest;
import com.ssafy.domain.chat.dto.response.ChatRoomUserResponse;
import com.ssafy.domain.chat.service.ChatRoomUserService;
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
@Tag(name = "ChatRoomUser API")
@RestController
@RequestMapping("/chat/user")
@RequiredArgsConstructor
public class ChatRoomUserController {
    private final ChatRoomUserService chatRoomUserService;

    @Operation(summary = "채팅방 유저 생성", description = "채팅방에 사용자를 추가한다.")
    @PostMapping
    public ResponseEntity<ChatRoomUserResponse> create(@RequestBody ChatRoomUserRequest chatRoomUserRequest, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ChatRoomUserResponse.from(chatRoomUserService.save(chatRoomUserRequest, userDetails.getUsername())));
    }

    @Operation(summary = "채팅방 유저 리스트 조회", description = "채팅방에 참여한 전체 사용자를 조회한다.")
    @GetMapping("/{chatRoomId}")
    public ResponseEntity<List<ChatRoomUserResponse>> userList(@PathVariable Long chatRoomId) {
        return ResponseEntity.ok(chatRoomUserService.findByChatRoomId(chatRoomId).stream().map(ChatRoomUserResponse::from).toList());
    }

    @Operation(summary = "채팅방 유저 삭제 - 채팅방 기반", description = "채팅방에 포함된 모든 채팅방 사용자를 삭제한다.")
    @DeleteMapping("/{chatRoomId}/all")
    public ResponseEntity<Object> deleteByChatRoomId(@PathVariable Long chatRoomId) {
        chatRoomUserService.deleteByChatRoomId(chatRoomId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "채팅방 유저 삭제 - 사용자 기반", description = "사용자의 모든 채팅방 사용자를 삭제한다.")
    @DeleteMapping
    public ResponseEntity<Object> deleteByMemberId(@AuthenticationPrincipal UserDetails userDetails) {
        chatRoomUserService.deleteByMemberId(userDetails.getUsername());
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "채팅방 유저 삭제 - 채팅방 및 사용자 기반", description = "채팅방과 사용자의 채팅방 사용자를 삭제한다.")
    @DeleteMapping("/{chatRoomId}")
    public ResponseEntity<Object> deleteByChatRoomIdMemberId(@PathVariable Long chatRoomId, @AuthenticationPrincipal UserDetails userDetails) {
        chatRoomUserService.deleteByChatRoomIdAntMemberId(chatRoomId, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }
}
