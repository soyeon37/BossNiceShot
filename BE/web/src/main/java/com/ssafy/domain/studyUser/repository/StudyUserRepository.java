package com.ssafy.domain.studyUser.repository;

import com.ssafy.domain.studyUser.entity.StudyUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudyUserRepository extends JpaRepository<StudyUser, Long> {
    List<StudyUser> findByStudyId(Long studyId);
    Optional<StudyUser> findByStudyIdAndMemberId(Long studyId, String memberId);
    void deleteByStudyIdAndMemberId(Long studyId, String memberId);
}
