package com.ssafy.domain.Companion.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Companion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long companionId;

    @Column(columnDefinition = )

}
