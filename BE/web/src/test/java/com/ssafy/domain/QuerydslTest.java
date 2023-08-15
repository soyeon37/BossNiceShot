package com.ssafy.domain;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.common.TeeBox;
import com.ssafy.domain.companion.entity.Companion;
import com.ssafy.domain.companion.entity.QCompanion;
import com.ssafy.domain.companion.repository.CompanionRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static com.ssafy.domain.companion.entity.QCompanion.companion;
import static com.ssafy.domain.member.entity.QMember.member;
import static com.ssafy.domain.follow.entity.QFollow.follow;

@SpringBootTest
@Transactional(readOnly = true)
public class QuerydslTest {
    @PersistenceContext
    EntityManager em;

    @Autowired
    private CompanionRepository companionRepository;

    @Test
    public void 테스트() {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);

        List<Companion> result = queryFactory
                .selectFrom(companion)
                .leftJoin(companion.member, member)
                .where(
                        eqTitle("제"),
                        eqMemberNickname(null),
                        eqTeeBox(TeeBox.NONE),
                        getFolloweeList(null),
                        companion.teeUpTime.gt(LocalDateTime.now()),
                        companion.capacity.gt(companion.companionUserCount)
                )
                .fetch();

        for(int i = 0; i < result.size(); i++) {
            System.out.println(result.get(i).getTitle());
        }
    }
    private BooleanExpression eqTitle(String title) {
        return title == null ? null : companion.title.contains(title);
    }

    private BooleanExpression eqMemberNickname(String memberNickname) {
        return memberNickname == null ? null : companion.member.nickname.contains(memberNickname);
    }

    private BooleanExpression eqTeeBox(TeeBox teeBox) {
        return teeBox == TeeBox.NONE ? null : companion.teeBox.eq(teeBox);
    }

    private BooleanExpression getFolloweeList(String followerId) {
        if (followerId == null) {
            return null;
        }

        JPAQueryFactory queryFactory = new JPAQueryFactory(em);

        List<String> followeeList = queryFactory
                .select(follow.followee.id)
                .from(follow)
                .where(
                        eqFollowerId(followerId)
                )
                .fetch();

        return followeeList == null ? null : companion.member.id.in(followeeList);
    }

    private BooleanExpression eqFollowerId(String followerId) {
        return followerId == null ? null : follow.follower.id.eq(followerId);
    }
}