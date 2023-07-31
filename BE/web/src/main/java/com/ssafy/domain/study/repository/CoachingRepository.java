package com.ssafy.domain.study.repository;

import com.ssafy.domain.study.entity.Coaching;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CoachingRepository extends JpaRepository<Coaching, Long>, JpaSpecificationExecutor<Coaching> {
    List<Coaching> findByMemberId(String memberId);

    @Query("select c from Coaching c where count(c.users) < c.capacity and c.reservedTime <= current_timestamp")
    List<Coaching> findEnableCoaching(Sort sort);

    List<Coaching> findByTitleContaining(String keword, Sort sort);
    List<Coaching> findByMemberIdContaining(String keword, Sort sort);
    List<Coaching> findByTitleContainingOrDescriptionContaining(String keword, Sort sort);
}
