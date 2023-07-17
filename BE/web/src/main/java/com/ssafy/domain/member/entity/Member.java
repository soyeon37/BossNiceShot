package com.ssafy.domain.member.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    @Id
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;

    @Column(name = "nickname")
    private String nickname;
    @Column(name = "tee_box")
    @Enumerated(EnumType.STRING)
    private TeeBox teeBox;

    @Column(name = "top_score")
    private int topScore;
    @Column(name = "average_score")
    private int averageScore;
    @Column(name = "level")
    private int level;

    @Column(name = "image")
    private String image;
    @Column(name = "introduction", columnDefinition = "TEXT")
    private String introduction;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private List<Role> role = new ArrayList<>(List.of(Role.ROLE_USER));

    public Member(String email, String password, String nickname, TeeBox teeBox) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.teeBox = teeBox;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.role.stream()
                .map(Role::name)
                .map(SimpleGrantedAuthority::new)
                .toList();
    }

    public boolean matchPassword(BCryptPasswordEncoder encoder, String password) {
        return encoder.matches(password, this.password);
    }
}
