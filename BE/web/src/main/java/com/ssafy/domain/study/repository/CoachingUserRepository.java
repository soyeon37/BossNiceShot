package com.ssafy.domain.study.repository;

import com.ssafy.domain.study.entity.CoachingUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CoachingUserRepository extends JpaRepository<CoachingUser, Long> {
    List<CoachingUser> findByCoachingId(Long coachingId);
    void deleteByCoachingIdAndMemberId(Long coachingId, String memberId);
}
