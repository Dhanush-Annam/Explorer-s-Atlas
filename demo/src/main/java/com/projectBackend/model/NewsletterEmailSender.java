package com.projectBackend.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class NewsletterEmailSender {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String recipientEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Welcome to Our Newsletter!");
        message.setFrom("vishwanth0615@gmail.com");

        String content = "Hello,\n\n"
                + "Thank you for subscribing to our newsletter!\n"
                + "We’ll keep you updated with our latest content and offers.\n\n"
                + "Best regards,\n"
                + "Website Team";

        message.setText(content);

        mailSender.send(message);
    }
}
