package com.ssafy.domain.studyChat.dto;

import lombok.Getter;

@Getter
public class StudyChat {
    private String message;
    private Long studyId;
    private String memberId;
    private String memberNickname;
}
