package com.ssafy.domain.studyUser.service;

import com.ssafy.domain.Member.service.MemberService;
import com.ssafy.domain.study.service.StudyService;
import com.ssafy.domain.studyUser.dto.request.StudyUserRequest;
import com.ssafy.domain.studyUser.entity.StudyUser;
import com.ssafy.domain.studyUser.repository.StudyUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StudyUserService {
    private final StudyUserRepository studyUserRepository;
    private final StudyService studyService;
    private final MemberService memberService;

    public List<StudyUser> findByStudyId(Long studyId) {
        return studyUserRepository.findByStudyId(studyId);
    }

    @Transactional
    public StudyUser save(StudyUserRequest studyUserRequest, String memberId) {
        StudyUser studyUser = studyUserRepository.findByStudyIdAndMemberId(studyUserRequest.studyId(), memberId)
                .orElseGet(() -> studyUserRepository.save(new StudyUser(studyService.findById(studyUserRequest.studyId()), memberService.findByMemberId(memberId))));

        studyService.findById(studyUserRequest.studyId()).getStudyUsers().add(studyUser);
        return studyUser;
    }

    @Transactional
    public void delteByStudyIdAndMemberId(Long studyId, String memberId) {
        studyUserRepository.deleteByStudyIdAndMemberId(studyId, memberId);
    }
}
