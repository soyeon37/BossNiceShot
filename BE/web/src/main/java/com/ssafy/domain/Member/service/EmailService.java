package com.ssafy.domain.Member.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;


@Service
public class EmailService{
    private JavaMailSender mailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendMail(String from, String to, String subject, String text) {
        try {

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(message, false, "UTF-8");
            mimeMessageHelper.setFrom(from);
            mimeMessageHelper.setTo(to);
            mimeMessageHelper.setSubject(subject);
            // 템플릿에 전달할 데이터 설정
            Context context = new Context();
            context.setVariable("name","soyeon");

            // 메일 내용 설정
            String html = templateEngine.process("WelcomeEmail", context);
            mimeMessageHelper.setText(html, true);
            mailSender.send(message);
        }catch(MailException exception){
            exception.printStackTrace();
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
