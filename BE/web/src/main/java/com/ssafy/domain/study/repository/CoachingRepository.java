package com.ssafy.domain.study.repository;

import com.ssafy.domain.study.entity.Coaching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CoachingRepository extends JpaRepository<Coaching, Long> {
    List<Coaching> findByMemberId(String memberId);

//    @Query("select c from Coaching c where count(c.users) < c.capacity and c.reservedTime <= current_timestamp")
//    List<Coaching> findEnableCoaching(Sort sort);


    @Query(value = "select c from Coaching c order by c.createdTime desc",
            countQuery = "select count(c) from Coaching c")
    Page<Coaching> findPaging(Pageable pageable);

    @Query(value = "select c from Coaching c where c.title like concat('%', :keyword, '%') order by c.createdTime desc",
            countQuery = "select count(c) from Coaching c")
    Page<Coaching> findPagingByTitle(Pageable pageable, @Param("keyword") String keyword);

    @Query(value = "select c from Coaching c where c.title like concat('%', :keyword, '%') or c.description like concat('%', :keyword, '%') order by c.createdTime desc",
            countQuery = "select count(c) from Coaching c")
    Page<Coaching> findPagingByTitleAndDescription(Pageable pageable, @Param("keyword") String keyword);
}
