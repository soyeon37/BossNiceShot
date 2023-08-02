package com.ssafy.domain.follow.repository;

import com.ssafy.domain.follow.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    List<Follow> findByFollowerId(String followerId);
    List<Follow> findByFolloweeId(String followeeId);
    Boolean existsByFollowerIdAndFolloweeId(String followerId, String followeeId);
    void deleteByFollowerIdAndFolloweeId(String followerId, String followeeId);
}
