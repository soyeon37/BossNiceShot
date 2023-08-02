package com.ssafy.domain.Member.repository;

import com.ssafy.domain.Member.entity.Member;
import com.ssafy.domain.Member.entity.TeeBox;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    Optional<Member> findById(String memberId);
    Optional<Member> findByNickname(String nickname);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE Member m " +
            "SET m.nickname = :nickname," +
            "m.teeBox = :teeBox," +
            "m.topScore = :topScore," +
            "m.averageScore = :averageScore," +
            "m.level = :level," +
            "m.image = :image," +
            "m.introduction = :intoduction " +
            "where m.id = :id")
    int updateMember(
            @Param(value = "nickname")String nickname,
            @Param(value = "teeBox") TeeBox teeBox,
            @Param(value = "topScore")Integer topScore,
            @Param(value = "averageScore")Integer averageScore,
            @Param(value = "level")String level,
            @Param(value = "image")String image,
            @Param(value = "intoduction")String intoduction,
            @Param(value = "id")String id
    );
}