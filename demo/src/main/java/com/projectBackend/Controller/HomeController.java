package com.projectBackend.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping("/")
    public String Homepage() {
        return "explorersatlas";
    }

    @GetMapping("/explorersatlas")
    public String Homepage2() {
        return "explorersatlas";
    }

    @GetMapping("/signup")
    public String signup() {
        return "signup";
    }

    @GetMapping("/login")
    public String loginPage() {
        return "signin";
    }

    @GetMapping("/aboutus")
    public String Aboutus() {
        return "aboutus";
    }

    @GetMapping("/bookingpage")
    public String bookingpage() {
        return "bookingpage";
    }

    @GetMapping("/contactus")
    public String contactus() {
        return "contactus";
    }

    @GetMapping("/dashbourd")
    public String dashbourd() {
        return "dashbourd";
    }

    @GetMapping("/services")
    public String services() {
        return "services";
    }

    @GetMapping("/booking")
    public String booking() {
        return "booking";
    }

    @GetMapping("/reviews")
    public String reviews() {
        return "Reviews";
    }

    @GetMapping("/hotelbooking")
    public String BookHotel(){
        return "HotelBooking";
    }

}
