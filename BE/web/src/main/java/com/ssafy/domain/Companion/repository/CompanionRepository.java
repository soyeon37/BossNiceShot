package com.ssafy.domain.Companion.repository;

import com.ssafy.domain.Companion.entity.Companion;
import com.ssafy.common.TeeBox;
import com.ssafy.domain.Member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CompanionRepository extends JpaRepository<Companion, Long> {
    // 신청 가능한 동행

    @Query(value = "select c from Companion c where c.currentPeople < c.aimPeople and c.endDate < now() order by c.createdTime desc",
            countQuery = "select count(c) from Companion c")
    Page<Companion> findPagingEnable(Pageable pageable);

    // 제목 키워드 검색
    @Query(value = "select c from Companion c where c.currentPeople < c.aimPeople and c.endDate < now() and c.title like concat('%', :keyword, '%') order by c.createdTime desc",
            countQuery = "select count(c) from Companion c")
    Page<Companion> findPagingByTitleContaining(Pageable pageable, @Param("keyword") String keyword);

    // 작성자 키워드 검색
    @Query(value = "select c from Companion c join fetch c.member where c.currentPeople < c.aimPeople and c.endDate < now() and c.member.nickname like concat('%', :keyword, '%') order by c.createdTime desc",
            countQuery = "select count(c) from Companion c")
    Page<Companion> findPagingByNicknameContaining(Pageable pageable, @Param("keyword") String keyword);

    // 제목 또는 내용 키워드 검색
    @Query(value = "select c from Companion c where c.currentPeople < c.aimPeople and c.endDate < now() and (c.title like concat('%', :keyword, '%') or c.contents like concat('%', :keyword, '%')) order by c.createdTime desc",
            countQuery = "select count(c) from Companion c")
    Page<Companion> findPagingByTitleContainingOrContentsContaining(Pageable pageable, @Param("keyword") String keyword);

    // 티박스 검색
    @Query(value = "select c from Companion c where c.currentPeople < c.aimPeople and c.endDate < now() and c.teeBox = :teeBox order by c.createdTime desc",
            countQuery = "select count(c) from Companion c")
    Page<Companion> findPagingByTeeBox(Pageable pageable, @Param("teeBox") TeeBox teeBox);

    // 팔로워검색
    @Query(value = "select c from Companion c, Follow f where c.member.id = f.followee.id and f.follower.id = :followerId and c.currentPeople < c.aimPeople and c.endDate < now() order by c.createdTime desc",
            countQuery = "select count(c) from Companion c")
    Page<Companion> findPagingByFollowerId(Pageable pageable, @Param("followerId")String followerId);

    //현재 인원 증가
    @Modifying
    @Query("UPDATE Companion c SET c.currentPeople = c.currentPeople + 1 WHERE c.id = :companionId")
    Companion increaseCurrentPeople(@Param("companionId") Long companionId);

    //현재 인원 감소
    @Modifying
    @Query("UPDATE Companion c SET c.currentPeople = c.currentPeople - 1 WHERE c.id = :companionId")
    Companion decreaseCurrentPeople(@Param("companionId") Long companionId);



}
