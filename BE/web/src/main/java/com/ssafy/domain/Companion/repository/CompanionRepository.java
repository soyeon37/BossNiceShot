package com.ssafy.domain.Companion.repository;

import com.ssafy.common.TeeBox;
import com.ssafy.domain.Companion.entity.Companion;
import com.ssafy.domain.chat.entity.ChatParticipant;
import com.ssafy.domain.follow.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanionRepository extends JpaRepository<Companion, Long> {

    //제목으로 검색
    List<Companion> findByTitle(String title);

    //작성자로 검색
    List<Companion> findByMemberId(String memberId);

    //제목 + 내용으로 검색
    List<Companion> findByTitleAndContents(String title, String contents);

    //티박스로 검색
    List<Companion> findByTeeBox(TeeBox teeBox);

    //팔로잉한 사람들이 동행 모집을 올렸는지 검색
//    List<Companion> findCompanionByFollowerId(String followerId);

}
