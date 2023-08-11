package com.ssafy.domain.companion.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.common.TeeBox;
import com.ssafy.domain.companion.dto.request.CompanionSearchRequest;
import com.ssafy.domain.companion.entity.Companion;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

import static com.ssafy.domain.companion.entity.QCompanion.companion;
import static com.ssafy.domain.follow.entity.QFollow.follow;
import static com.ssafy.domain.member.entity.QMember.member;

@RequiredArgsConstructor
public class CompanionRepositoryImpl implements CompanionRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    /*
    라연 - 팔로우 유무에 따라 수정 필요
     */
    @Override
    public Page<Companion> searchAll(CompanionSearchRequest companionSearchRequest, Pageable pageable) {
        List<Companion> result = queryFactory
                .selectFrom(companion)
                .leftJoin(companion.member, member)
                .fetchJoin()
                .where(
                        eqTitle(companionSearchRequest.title()),
                        eqMemberNickname(companionSearchRequest.memberNickname()),
                        eqDescription(companionSearchRequest.description()),
                        eqTeeBox(companionSearchRequest.teeBox()),
                        companion.member.id.in(getFolloweeList(companionSearchRequest.followerId()))
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(companion.createdTime.desc())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(companion.count())
                .from(companion)
                .where(
                        eqTitle(companionSearchRequest.title()),
                        eqMemberNickname(companionSearchRequest.memberNickname()),
                        eqDescription(companionSearchRequest.description()),
                        eqTeeBox(companionSearchRequest.teeBox()),
                        companion.member.id.in(getFolloweeList(companionSearchRequest.followerId()))
                );

        return PageableExecutionUtils.getPage(result, pageable, countQuery::fetchOne);
    }

    private BooleanExpression eqTitle(String title) {
        return title == null ? null : companion.title.contains(title);
    }

    private BooleanExpression eqMemberNickname(String memberNickname) {
        return memberNickname == null ? null : companion.member.nickname.contains(memberNickname);
    }

    private BooleanExpression eqDescription(String description) {
        return description == null ? null : companion.description.contains(description);
    }

    private BooleanExpression eqTeeBox(TeeBox teeBox) {
        return teeBox == TeeBox.NONE ? null : companion.teeBox.eq(teeBox);
    }

    private BooleanExpression eqFollowerId(String followerId) {
        return followerId == null ? null : follow.follower.id.eq(followerId);
    }

    private List<String> getFolloweeList(String followerId){
        if (followerId == null)
            return null;

        List<String> followeeList = queryFactory
                .select(follow.followee.id)
                .from(follow)
                .where(
                        eqFollowerId(followerId)
                )
                .fetch();

        return followeeList;
    }
}

