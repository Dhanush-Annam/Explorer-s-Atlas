package com.projectBackend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projectBackend.Service.EmailsenderService;
import com.projectBackend.model.ContactRequest;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // For development - restrict in production
public class ContactController {

    @Autowired
    private EmailsenderService emailService;

    @PostMapping("/contact")
    public ResponseEntity<String> submitContactForm(@RequestBody ContactRequest request) {
        try {
            // Build email content
            String emailBody = "Contact Request Details:\n" +
                    "Name: " + request.getName() + "\n" +
                    "Email: " + request.getEmail() + "\n" +
                    "Subject: " + request.getSubject() + "\n" +
                    "Message: " + request.getMessage() + "\n" +
                    "Preferred Contact Method: " + request.getContactMethod();

            emailService.sendEmail(request.getEmail(), emailBody, "Contact Form: " + request.getSubject());
            
            emailService.sendEmail(request.getEmail(), 
                    "Thank you for contacting Explorer's Atlas. We have received your inquiry and will get back to you shortly.", 
                    "Your Explorer's Atlas Inquiry Received");

            return ResponseEntity.ok("Contact form submitted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to send email: " + e.getMessage());
        }
    }
}
