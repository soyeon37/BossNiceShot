package com.ssafy.domain.study.service;

import com.ssafy.domain.Member.service.MemberService;
import com.ssafy.domain.study.dto.request.StudyUserRequest;
import com.ssafy.domain.study.entity.CoachingUser;
import com.ssafy.domain.study.entity.LearningUser;
import com.ssafy.domain.study.repository.CoachingUserRepository;
import com.ssafy.domain.study.repository.LearningUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StudyUserService {
    private final MemberService memberService;
    private final CoachingService coachingService;
    private final LearningService learningService;
    private final CoachingUserRepository coachingUserRepository;
    private final LearningUserRepository learningUserRepository;

    @Transactional
    public CoachingUser createCoachingUser(StudyUserRequest studyUserRequest, String memberId) {
        return coachingUserRepository.save(new CoachingUser(coachingService.findById(studyUserRequest.studyId()), memberService.findByMemberId(memberId)));
    }

    @Transactional
    public LearningUser createLearningUser(StudyUserRequest studyUserRequest, String memberId) {
        return learningUserRepository.save(new LearningUser(learningService.findById(studyUserRequest.studyId()), memberService.findByMemberId(memberId)));
    }

    @Transactional
    public void deleteCoachingUser(Long coachingId, String memberId) {
        coachingUserRepository.deleteByCoachingIdAndMemberId(coachingId, memberId);
    }

    @Transactional
    public void deleteLearningUser(Long learningId, String memberId) {
        learningUserRepository.deleteByLearningIdAndMemberId(learningId, memberId);
    }

    public List<CoachingUser> findCoachingUserByCoachingId(Long coachingId) {
        return coachingUserRepository.findByCoachingId(coachingId);
    }

    public List<LearningUser> findLeaningUserByLearningId(Long learningId) {
        return learningUserRepository.findByLearningId(learningId);
    }
}
