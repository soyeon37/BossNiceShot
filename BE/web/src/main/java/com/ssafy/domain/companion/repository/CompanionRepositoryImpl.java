package com.ssafy.domain.companion.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.common.TeeBox;
import com.ssafy.domain.companion.dto.request.CompanionSearchRequest;
import com.ssafy.domain.companion.entity.Companion;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.time.LocalDateTime;
import java.util.List;

import static com.ssafy.domain.companion.entity.QCompanion.companion;
import static com.ssafy.domain.follow.entity.QFollow.follow;
import static com.ssafy.domain.member.entity.QMember.member;

@RequiredArgsConstructor
public class CompanionRepositoryImpl implements CompanionRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Companion> searchAll(CompanionSearchRequest companionSearchRequest, Pageable pageable) {
        List<Companion> result = queryFactory
                .selectFrom(companion)
                .leftJoin(companion.member, member)
                .where(
                        eqTitle(companionSearchRequest.title()),
                        eqMemberNickname(companionSearchRequest.memberNickname()),
                        eqDescription(companionSearchRequest.description()),
                        eqTeeBox(companionSearchRequest.teeBox()),
                        getFolloweeList(companionSearchRequest.followerId()),
                        companion.teeUpTime.gt(LocalDateTime.now()),
                        companion.capacity.gt(companion.companionUserCount)
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(companion.createdTime.desc())
                .fetch();

        JPQLQuery<Companion> count = queryFactory
                .selectFrom(companion)
                .where(
                        eqTitle(companionSearchRequest.title()),
                        eqMemberNickname(companionSearchRequest.memberNickname()),
                        eqDescription(companionSearchRequest.description()),
                        eqTeeBox(companionSearchRequest.teeBox()),
                        getFolloweeList(companionSearchRequest.followerId()),
                        companion.teeUpTime.gt(LocalDateTime.now()),
                        companion.capacity.gt(companion.companionUserCount)
                );

        return PageableExecutionUtils.getPage(result, pageable, count::fetchCount);
    }

    private BooleanExpression eqTitle(String title) {
        return title == null ? null : companion.title.contains(title);
    }

    private BooleanExpression eqMemberNickname(String memberNickname) {
        return memberNickname == null ? null : companion.member.nickname.contains(memberNickname);
    }

    private BooleanExpression eqDescription(String description) {
        return description == null ? null : companion.description.contains(description).or(companion.title.contains(description));
    }

    private BooleanExpression eqTeeBox(TeeBox teeBox) {
        return teeBox == TeeBox.NONE || teeBox == null ? null : companion.teeBox.eq(teeBox);
    }

    private BooleanExpression eqFollowerId(String followerId) {
        return followerId == null ? null : follow.follower.id.eq(followerId);
    }

    private BooleanExpression getFolloweeList(String followerId) {
        if (followerId == null) {
            return null;
        }

        List<String> followeeList = queryFactory
                .select(follow.followee.id)
                .from(follow)
                .where(
                        eqFollowerId(followerId)
                )
                .fetch();

        return followeeList == null ? null : companion.member.id.in(followeeList);
    }
}

