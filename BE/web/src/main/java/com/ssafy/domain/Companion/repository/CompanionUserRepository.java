package com.ssafy.domain.Companion.repository;

import com.ssafy.domain.Companion.entity.Companion;
import com.ssafy.domain.Companion.entity.CompanionUser;
import com.ssafy.domain.study.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CompanionUserRepository extends JpaRepository<CompanionUser, Long> {
    //컴패니언 기반으로 불러오는 것
    List<CompanionUser> findByCompanionId(Long companyId);

    // 유저 기반으로 불러오는 것
    Optional<CompanionUser> findByCompanionIdAndMemberId(Long companionId, String memberId);

    void deleteByCompanionIdAndMemberId(Long companionId, String memberId);

}

