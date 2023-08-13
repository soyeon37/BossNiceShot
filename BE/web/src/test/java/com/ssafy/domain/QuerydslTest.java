package com.ssafy.domain;

import com.ssafy.domain.companion.dto.request.CompanionCreateRequest;
import com.ssafy.domain.companion.repository.CompanionRepository;
import com.ssafy.domain.member.entity.Member;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional(readOnly = true)
public class QuerydslTest {

    @Autowired
    private EntityManager em;

    @Autowired
    private CompanionRepository companionRepository;

    /*

    public record CompanionCreateRequest(@NotNull String title,
                                     @NotNull String description,
                                     @NotNull Integer field,
                                     @NotNull TeeBox teeBox,
                                     @NotNull Integer capacity,
                                     @NotNull String teeUptime,
                                     @NotNull String applicationDeadline
     */

    @Test
    public void querydsl_테스트() {
        Comp request = new CompanionCreateRequest(
                "테스트1",
                "설명1",
                1,
                "RED",
                4,
                "2023-05-05 12:40:00",
                "2023-05-05 12:40:00"
        );

        companionRepository.save(request);
    }
}
