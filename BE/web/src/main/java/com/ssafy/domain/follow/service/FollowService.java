package com.ssafy.domain.follow.service;

import com.ssafy.domain.member.service.MemberService;
import com.ssafy.domain.follow.dto.request.FollowRequest;
import com.ssafy.domain.follow.entity.Follow;
import com.ssafy.domain.follow.repository.FollowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FollowService {
    private final FollowRepository followRepository;
    private final MemberService memberService;

    public List<Follow> findAllByFollowerId(String followerId) {
        return followRepository.findByFollowerId(followerId);
    }

    public Boolean checkFollowing(String followerId, String followeeId) {
        return followRepository.existsByFollowerIdAndFolloweeId(followerId, followeeId);
    }

    @Transactional
    public Follow save(String followerId, FollowRequest followRequest) {
        return followRepository.save(new Follow(memberService.findByMemberId(followerId), memberService.findByMemberId(followRequest.followeeId())));
    }

    @Transactional
    public void delete(String followerId, String followeeId) {
        followRepository.deleteByFollowerIdAndFolloweeId(followerId, followeeId);
    }
}
