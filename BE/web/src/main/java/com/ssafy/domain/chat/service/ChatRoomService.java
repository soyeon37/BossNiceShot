package com.ssafy.domain.chat.service;

import com.ssafy.domain.chat.dto.request.ChatRoomRequest;
import com.ssafy.domain.chat.dto.response.ChatRoomResponse;
import com.ssafy.domain.chat.entity.ChatRoom;
import com.ssafy.domain.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;

    @Transactional
    public ChatRoomResponse findById(Long roomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(roomId).orElseThrow(
                () -> new IllegalArgumentException("해당 ChatRoom이 존재하지 않습니다. id = " + roomId)
        );

        return ChatRoomResponse.from(chatRoom);
    }

    @Transactional
    public Long save(ChatRoomRequest chatRoomRequest) {
        return chatRoomRepository.save(chatRoomRequest.toChatRoom()).getId();
    }

    @Transactional
    public void delete(Long roomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(roomId).orElseThrow(
                () -> new IllegalArgumentException("해당 ChatRoom이 존재하지 않습니다. id = " + roomId)
        );

        chatRoomRepository.delete(chatRoom);
    }

    // 최신순
    @Transactional
    public List<ChatRoomResponse> findAll() {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdTime");

        return chatRoomRepository.findAll(sort).stream().map(ChatRoomResponse::from).toList();
    }
}
