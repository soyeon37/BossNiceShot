package com.ssafy.domain.Member.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

@Service
public record EmailService(JavaMailSender javaMailSender) {
    public void sendMail(String email, String title, String context){

        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom("soyeun37@gmail.com");
            System.out.println("1");
            simpleMailMessage.setTo(email);
            System.out.println("2");
            simpleMailMessage.setSubject(title);
            System.out.println("3");
            simpleMailMessage.setText(context);
            System.out.println("4");
            javaMailSender.send(simpleMailMessage);
            System.out.println("5");
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
