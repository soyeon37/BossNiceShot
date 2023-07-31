package com.ssafy.domain.Companion.repository;

import com.ssafy.domain.Companion.entity.CompanionUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanionUserRepository extends JpaRepository<CompanionUser, Long> {
    //컴패니언 기반으로 불러오는 것
    // 유저 기반으로 불러오는 것
}
