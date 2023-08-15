package com.ssafy.domain.study.repository;

import com.ssafy.domain.study.entity.StudyUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudyUserRepository extends JpaRepository<StudyUser, Long> {
    List<StudyUser> findByStudyId(Long studyId);
    Optional<StudyUser> findByStudyIdAndMemberId(Long studyId, String memberId);
    void deleteByStudyIdAndMemberId(Long studyId, String memberId);
    void deleteByStudyId(Long studyId);
}
