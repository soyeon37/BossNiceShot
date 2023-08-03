package com.ssafy.domain.studyChat.controller;

import com.ssafy.domain.studyChat.dto.StudyChat;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "StudyChat API")
@RestController
@RequiredArgsConstructor
public class StudyChatController {
    private final SimpMessageSendingOperations sendingOperations;

    // 클라이언트에서 /pub/study/chat으로 메세지 발행
    @MessageMapping("/study/chat")
    public void send(StudyChat studyChat) {
        sendingOperations.convertAndSend("/sub/study/chat" + studyChat.getStudyId(), studyChat);
    }
}
