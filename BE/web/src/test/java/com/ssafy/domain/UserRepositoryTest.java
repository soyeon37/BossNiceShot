//package com.ssafy.domain;
//
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//class UserRepositoryTest {
//    @Autowired
//    UserRepository userRepository;
//
//    @Test
//    public void 회원가입() {
//        User user = new User();
//        user.setName("안녕");
//
//        User id = userRepository.save(user);
//
//        Assertions.assertEquals(user.getName(), id.getName());
//    }
//}