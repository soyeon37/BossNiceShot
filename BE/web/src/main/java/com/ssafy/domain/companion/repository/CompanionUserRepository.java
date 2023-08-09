package com.ssafy.domain.companion.repository;

import com.ssafy.common.Status;
import com.ssafy.domain.companion.entity.CompanionUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CompanionUserRepository extends JpaRepository<CompanionUser, Long> {
    List<CompanionUser> findByCompanionIdAndStatus(Long companionId, Status status);

    Optional<CompanionUser> findByCompanionIdAndMemberId(Long companionId, String memberId);

    void deleteByCompanionIdAndMemberId(Long companionId, String memberId);

    void deleteByCompanionId(Long companionId);
}

