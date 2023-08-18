package com.ssafy.domain.companion.repository;

import com.ssafy.domain.companion.entity.Companion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CompanionRepository extends JpaRepository<Companion, Long>, CompanionRepositoryCustom {
    @Query(value = "select c from Companion c where c.teeUpTime > now() and c.capacity > c.companionUserCount order by c.createdTime desc",
            countQuery = "select count(c) from Companion c")
    Page<Companion> findPaging(Pageable pageable);

    @Query("select c from Companion c, CompanionUser u where c.id = u.companion.id and u.member.id = :companionUserMemberId and u.status = 'ACTIVE' and c.teeUpTime > now() order by c.createdTime desc")
    List<Companion> findParticipatingCompanionByCompanionUserMemberId(@Param("companionUserMemberId") String companionUserMemberId);

    @Query("select c from Companion c where c.member.id = :memberId and c.teeUpTime > now() order by c.createdTime desc")
    List<Companion> findCreatedCompanionByMemberId(@Param("memberId") String memberId);

    @Query("select c from Companion c, CompanionUser u where c.id = u.companion.id and u.member.id = :companionUserMemberId and u.status = 'ACTIVE' and c.teeUpTime < now() order by  c.teeUpTime desc")
    List<Companion> findPastByCompanionUserMemberId(@Param("companionUserMemberId") String companionUserMemberId);

    @Query("select c.field from Companion c group by c.field order by count(c) limit 5")
    List<Integer>  findFieldOrderByCountDesc();

    @Query(value = "select c from Companion c order by c.createdTime desc limit 5")
    List<Companion> findOrderByCreatedTimeLimitFive();
}
