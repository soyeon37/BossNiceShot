package com.ssafy.domain.member.dto.request;

import com.ssafy.domain.member.entity.Member;
import com.ssafy.domain.member.entity.TeeBox;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public record MemberRegisterRequest (@NotNull String email,
                                    @NotNull String password,
                                    @NotNull String nickname,
                                    @NotNull TeeBox teeBox){
    public Member toMember(BCryptPasswordEncoder encoder) {
        return new Member(email, encoder.encode(password), nickname, teeBox);
    }
}
