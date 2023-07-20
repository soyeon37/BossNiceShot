package com.ssafy.domain.chat.service;

import com.ssafy.domain.chat.dto.request.ChatRoomRequest;
import com.ssafy.domain.chat.entity.ChatRoom;
import com.ssafy.domain.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;

    public List<ChatRoom> findAll() {
        Sort sort = Sort.by(Sort.Direction.DESC, "createdTime");
        return chatRoomRepository.findAll(sort);
    }

    public ChatRoom findById(Long roomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(roomId).orElseThrow(
                () -> new IllegalArgumentException("해당 채팅방이 존재하지 않습니다. id = " + roomId)
        );
        return chatRoom;
    }

    @Transactional
    public ChatRoom save(ChatRoomRequest chatRoomRequest) {
        return chatRoomRepository.save(chatRoomRequest.toChatRoom());
    }

    @Transactional
    public void delete(Long roomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(roomId).orElseThrow(
                () -> new IllegalArgumentException("해당 채팅방이 존재하지 않습니다. id = " + roomId)
        );

        chatRoomRepository.delete(chatRoom);
    }
}
