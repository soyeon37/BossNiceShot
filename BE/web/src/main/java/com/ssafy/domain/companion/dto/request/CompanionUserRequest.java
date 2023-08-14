package com.ssafy.domain.companion.dto.request;

import com.ssafy.domain.companion.entity.Companion;
import com.ssafy.domain.companion.entity.CompanionUser;
import com.ssafy.domain.member.entity.Member;
import jakarta.validation.constraints.NotNull;

public record CompanionUserRequest(@NotNull Long companionId) {
    public CompanionUser toCompanionUser(Companion companion, Member member) {
        return new CompanionUser(member, companion);
    }
}
