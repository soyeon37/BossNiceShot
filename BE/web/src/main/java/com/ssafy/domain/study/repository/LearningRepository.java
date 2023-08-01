package com.ssafy.domain.study.repository;

import com.ssafy.domain.study.entity.Learning;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LearningRepository extends JpaRepository<Learning, Long> {
    List<Learning> findByMemberId(String memberId);
}
