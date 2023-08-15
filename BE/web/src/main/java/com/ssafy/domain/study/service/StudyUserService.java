package com.ssafy.domain.study.service;

import com.ssafy.domain.member.service.MemberService;
import com.ssafy.domain.study.dto.request.StudyUserRequest;
import com.ssafy.domain.study.entity.StudyUser;
import com.ssafy.domain.study.repository.StudyUserRepository;
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

        studyService.findById(studyUserRequest.studyId()).enterUser();
        return studyUser;
    }

    @Transactional
    public void deleteByStudyIdAndMemberId(Long studyId, String memberId) {
        studyUserRepository.deleteByStudyIdAndMemberId(studyId, memberId);

        studyService.findById(studyId).leaveUser();
    }

    @Transactional
    public void deleteByStudyId(Long studyId) {
        studyUserRepository.deleteByStudyId(studyId);
    }
}
