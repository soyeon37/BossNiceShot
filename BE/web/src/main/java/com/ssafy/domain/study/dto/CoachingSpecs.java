package com.ssafy.domain.study.dto;

import com.ssafy.domain.study.entity.Coaching;
import org.springframework.data.jpa.domain.Specification;

public class CoachingSpecs {
    public static Specification<Coaching> containTitle(String keyword) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("title"), "%" + keyword + "%");
    }

    public static Specification<Coaching> containNickname(String keyword) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("member"), "%" + keyword + "%");
    }

    public static Specification<Coaching> containDescription(String keyword) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("title"), "%" + keyword + "%");
    }
}
