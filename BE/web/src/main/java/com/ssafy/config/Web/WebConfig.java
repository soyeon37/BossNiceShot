//package com.ssafy.config.Web;
//
//import org.springframework.context.annotation.ComponentScan;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
///**
// * CORS ERROR 서버 측 해결
// */
//@Configuration
//@ComponentScan("com.ssafy.config.Web")
//public class WebConfig implements WebMvcConfigurer {
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("http://localhost:3000") // React 애플리케이션의 도메인을 여기에 추가
//                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                .allowedHeaders("*")
//                .allowedHeaders("Authorization", "Content-Type") // 허용할 요청 헤더를 여기에 추가
//                .allowCredentials(true)
////                .exposedHeaders("Authorization")
//                .maxAge(3600);
//
//    }
//}