package com.ssafy.config.jpa;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaAuditing
@EnableJpaRepositories(
        basePackages = "com.ssafy.domain",
        excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = { com.ssafy.domain.chat.repository.ChatMessageRepository.class, com.ssafy.domain.Member.repository.RefreshTokenRepository.class, com.ssafy.domain.Notification.repository.NotificationRepository.class})
)
public class JpaConfig {
}
