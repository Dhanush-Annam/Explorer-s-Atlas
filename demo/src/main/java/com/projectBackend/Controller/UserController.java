package com.projectBackend.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.projectBackend.model.User;
import com.projectBackend.repositories.UserRepository;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/signup")
    public String registerUser(@RequestParam String name,
                               @RequestParam String email,
                               @RequestParam String password,
                               HttpSession session){
        Optional<User>check = userRepo.findById(email);
        if (check.isPresent()) {
            return "User with this email already exists";
        }
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        userRepo.save(user);
        session.setAttribute("useremail", email);
        return "User registered successfully!";
    }

    @GetMapping("/username")
    public String getUserNameFromSession(HttpSession session) {

        String retrievedEmail = (String) session.getAttribute("useremail");
        if (retrievedEmail != null && !retrievedEmail.isEmpty()) {
            return retrievedEmail;
        } else {
            return "No email found in session. Please register or log in.";
        }
    }

    @GetMapping("/signin")
    public String signin(@RequestParam String email , @RequestParam String password , HttpSession session){
        Optional<User> userOptional = userRepo.findById(email); // Renamed to userOptional for clarity

        if (userOptional.isEmpty()) {
            return "code for invalid credential";
        }
        User user = userOptional.get(); // fix form google 
        if(!user.getPassword().equals(password))
        {
            return "code for invalid credential";
        }
        session.setAttribute("useremail" , email);
        return "user logged in succesfully";
    }
}
