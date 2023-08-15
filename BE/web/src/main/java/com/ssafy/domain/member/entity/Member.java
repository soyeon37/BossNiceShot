package com.ssafy.domain.member.entity;

import com.ssafy.audit.BaseTime;
import com.ssafy.common.TeeBox;
import com.ssafy.domain.member.dto.request.SignUpRequest;
import com.ssafy.domain.member.dto.request.UpdateMemberRequest;
import com.ssafy.domain.member.dto.request.UpdatePasswordRequest;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Member extends BaseTime implements UserDetails{
    @Id
    @Column(name = "id", updatable = false, unique = true, nullable = false)
    private String id;

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
    private String level;

    @Column(name = "image")
    private String image;

    @Column(name = "introduction", columnDefinition = "TEXT")
    private String introduction;

    @Column(name = "is_kakao") // Kakao 계정이면 true
    @ColumnDefault("false")
    private Boolean isKakao;

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default // roles table 자동 생성
    @Enumerated(EnumType.STRING)
    private List<Role> roles = new ArrayList<>(List.of(Role.ROLE_USER));

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(Role::name)
                .map(SimpleGrantedAuthority::new)
                .toList();
    }

    public static Member from(SignUpRequest request, PasswordEncoder encoder){
            return Member.builder()
                    .id(request.id())
                    .password(encoder.encode(request.password()))
                    .nickname(request.nickname())
                    .teeBox(request.teeBox())
                    .topScore(request.topScore())
                    .averageScore(request.averageScore())
                    .level(request.level())
                    .image(request.image())
                    .introduction(request.introduction())
                    .isKakao(request.isKakao())
                    .build();
    }

    public void update(UpdateMemberRequest request){
        this.nickname = request.nickname();
        this.averageScore = request.averageScore();
        this.topScore = request.topScore();
        this.level = request.level();
        this.image = request.image();
        this.introduction = request.introduction();
        this.teeBox = request.teeBox();
    }

    public void updatePassword(UpdatePasswordRequest request, PasswordEncoder encoder ){
        this.password = encoder.encode(request.passNew());
    }

    @Override
    public String getUsername() {
        return id;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}