//package com.ssafy.config.security;
//
//import com.ssafy.config.security.jwt.JwtTokenProvider;
//import com.ssafy.config.security.jwt.JwtAuthenticationFilter;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
///**
// * 인증(authentication) 와 인가(authorization) 처리를 위한 스프링 시큐리티 설정 정의.
// */
//@Configuration
//@EnableWebSecurity
//@RequiredArgsConstructor
//public class SecurityConfig {
//
//    private final JwtTokenProvider jwtTokenProvider;
//
//    private static final String[] AUTH_WHITELIST = {
//            "/",
//            "/swagger-resources",
//            "/swagger-resources/**",
//            "/configuration/ui",
//            "/configuration/security",
//            "/swagger-ui.html",
//            "/webjars/**",
//            "/v3/api-docs/**",
//            "/api/public/**",
//            "/api/public/authenticate",
//            "/actuator/*",
//            "/swagger-ui/**",
//            "/api-docs/**",
//            "/members/**",
//            "/swagger*/**",
//            "/solution/detect",
//            "/members/login",
//            "/members/sign-up",
//            "/members/sign-in",
//    };
//
//    @Bean
//    public BCryptPasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http.csrf(AbstractHttpConfigurer::disable);
//        http
//                .authorizeHttpRequests((authorize) -> authorize
//                        .requestMatchers(AUTH_WHITELIST).permitAll()
//                        .requestMatchers("/members/test").hasRole("USER")
//                        .requestMatchers("/members/sign-up").hasRole("USER")
//                        .requestMatchers("/members/sign-in").hasRole("USER")
//                        .anyRequest().authenticated()
//                )
//                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
////                .httpBasic(withDefaults()); // 권한이 없으면 로그인 페이지로 이동
//        return http.build();
//    }
//
////    // prefix
////    @Bean
////    ForwardedHeaderFilter forwardedHeaderFilter() {
////        return new ForwardedHeaderFilter();
////    }
//
//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        return (web) -> web.ignoring().requestMatchers("/v3/api-docs/**");
//    }
//}