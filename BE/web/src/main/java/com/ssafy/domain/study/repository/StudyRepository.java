package com.ssafy.domain.study.repository;

import com.ssafy.domain.study.entity.Study;
import com.ssafy.domain.study.entity.StudyType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudyRepository extends JpaRepository<Study, Long> {
    List<Study> findByTypeAndMemberId(StudyType type, String memberId);

    @Query(value = "select s from Study s where s.type = :type order by s.createdTime desc",
            countQuery = "select count(s) from Study  s")
    Page<Study> findPagingByType(Pageable pageable, @Param("type")StudyType type);

    @Query(value = "select s from Study s where s.type = :type and s.title like concat('%', :keyword, '%') order by s.createdTime desc",
            countQuery = "select count(s) from Study s")
    Page<Study> findPagingByTypeAndTitleContaining(Pageable pageable, @Param("type")StudyType type, @Param("keyword") String keyword);

    @Query(value = "select s from Study s join fetch s.member where s.type = :type and s.member.nickname like concat('%', :keyword, '%') order by s.createdTime desc",
            countQuery = "select count(s) from Study s")
    Page<Study> findPagingByTypeAndMemberNickNameContaining(Pageable pageable, @Param("type")StudyType type, @Param("keyword") String keyword);

    @Query(value = "select s from Study s where s.type = :type and s.title like concat('%', :keyword, '%') or s.description like concat('%', :keyword, '%') order by s.createdTime desc",
            countQuery = "select count(s) from Study s")
    Page<Study> findPagingByTypeAndTitleContainingOrDescriptionContaining(Pageable pageable, @Param("type")StudyType type, @Param("keyword") String keyword);

    @Query(value = "select s from Study s where s.type = :type and s.status = 'ACTIVE' and s.studyUserCount < s.capacity order by s.createdTime desc ",
            countQuery = "select count(s) from Study s")
    Page<Study> findPagingAttandableByType(Pageable pageable, @Param("type")StudyType type);

    @Query(value = "select s from Study s where s.type = :type and s.status = 'ACTIVE' and s.studyUserCount < s.capacity and s.title like concat('%', :keyword, '%') order by s.createdTime desc",
            countQuery = "select count(s) from Study s")
    Page<Study> findPagingAttandableByTypeAndTitleContaining(Pageable pageable, @Param("type")StudyType type, @Param("keyword") String keyword);

    @Query(value = "select s from Study s join fetch s.member where s.type = :type and s.status = 'ACTIVE' and s.studyUserCount < s.capacity and s.member.nickname like concat('%', :keyword, '%') order by s.createdTime desc",
            countQuery = "select count(s) from Study s")
    Page<Study> findPagingAttandableByTypeAndMemberNickNameContaining(Pageable pageable, @Param("type")StudyType type, @Param("keyword") String keyword);

    @Query(value = "select s from Study s where s.type = :type and s.status = 'ACTIVE' and s.studyUserCount < s.capacity and s.title like concat('%', :keyword, '%') or s.description like concat('%', :keyword, '%') order by s.createdTime desc",
            countQuery = "select count(s) from Study s")
    Page<Study> findPagingAttandableByTypeAndTitleContainingOrDescriptionContaining(Pageable pageable, @Param("type")StudyType type, @Param("keyword") String keyword);

    @Query(value = "select s from Study s order by s.createdTime desc limit 5")
    List<Study> findOrderByCreatedTimeLimitFive();
}