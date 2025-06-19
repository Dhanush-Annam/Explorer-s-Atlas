package com.projectBackend.Controller;

import com.projectBackend.model.NewsletterEmailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class SubscriptionController {

    @Autowired
    private NewsletterEmailSender emailSender;

    @PostMapping("/subscribe")
    public String subscribeToNewsletter(@RequestParam String email) {
        try {
            emailSender.sendEmail(email);
            return "<p>Thank you for subscribing!</p>";
        } catch (MailException e) {
            return "<p>Failed to send email. Please try again later.</p>";
        }
    }
}
