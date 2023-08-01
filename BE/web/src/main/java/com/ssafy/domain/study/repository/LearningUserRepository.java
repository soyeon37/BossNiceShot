package com.ssafy.domain.study.repository;

import com.ssafy.domain.study.entity.LearningUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LearningUserRepository extends JpaRepository<LearningUser, Long> {
    List<LearningUser> findByLearningId(Long learningId);
    void deleteByLearningIdAndMemberId(Long learningId, String memberId);
}
