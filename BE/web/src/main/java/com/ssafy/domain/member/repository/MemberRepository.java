package com.ssafy.domain.member.repository;

import com.ssafy.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, String> {

    Member findByEmail(String email);
}
