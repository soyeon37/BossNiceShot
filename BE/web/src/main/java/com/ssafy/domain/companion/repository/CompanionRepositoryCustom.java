package com.ssafy.domain.companion.repository;

import com.ssafy.domain.companion.dto.request.CompanionSearchRequest;
import com.ssafy.domain.companion.entity.Companion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CompanionRepositoryCustom {
    Page<Companion> searchAll(CompanionSearchRequest companionSearchRequest, Pageable pageable);
}
