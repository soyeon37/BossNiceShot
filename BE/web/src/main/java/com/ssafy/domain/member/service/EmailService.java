package com.ssafy.domain.member.service;

import com.sun.mail.smtp.SMTPAddressFailedException;
import com.sun.mail.smtp.SMTPSendFailedException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;


@Slf4j
@Service
public class EmailService{
    private JavaMailSender mailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendMail(String from, String to, String subject, String authString) {
        try {

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(message, false, "UTF-8");
            mimeMessageHelper.setFrom(from);
            mimeMessageHelper.setTo(to);
            mimeMessageHelper.setSubject(subject);
            // 템플릿에 전달할 데이터 설정
            Context context = new Context();
            context.setVariable("name","soyeon");
            context.setVariable("authNum", authString);

            // 메일 내용 설정
            String html = templateEngine.process("WelcomeEmail", context);
            mimeMessageHelper.setText(html, true);
            mailSender.send(message);
//        }catch(MailException exception){
//            exception.printStackTrace();
        }catch (MessagingException e) {
            if (e instanceof SMTPSendFailedException) {
                SMTPSendFailedException smtpSendFailedException = (SMTPSendFailedException) e;
                if (isTimeoutException(e)) {
                    // Handle the SMTP timeout issue here (e.g., log the error, retry, notify the user)
                    log.error("SMTP timeout error: " + e.getMessage());
                }
            } else {
                // Handle other MessagingException (e.g., authentication error, invalid email address, etc.)
                log.error("SMTP error: " + e.getMessage());
            }
        }
    }
    private static boolean isTimeoutException(MessagingException e) {
        // Check if the exception message or error code indicates a timeout
        return e.getMessage().toLowerCase().contains("timeout") || e instanceof SMTPAddressFailedException;
    }

}
