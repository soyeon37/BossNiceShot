package com.ssafy.domain.Member.repository;

import com.ssafy.domain.Member.entity.Member;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    Optional<Member> findById(String memberId);
    Optional<Member> findByNickname(String nickname);

}