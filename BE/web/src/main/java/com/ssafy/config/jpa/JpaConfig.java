package com.ssafy.config.jpa;

import com.ssafy.domain.companion.repository.CompanionChatRepository;
import com.ssafy.domain.member.repository.RefreshTokenRepository;
import com.ssafy.domain.notification.repository.NotificationRepository;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaAuditing
@EnableJpaRepositories(
        basePackages = "com.ssafy.domain",
        excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = { CompanionChatRepository.class, RefreshTokenRepository.class, NotificationRepository.class})
)
public class JpaConfig {
}
