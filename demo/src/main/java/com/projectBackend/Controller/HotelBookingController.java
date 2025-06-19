package com.projectBackend.Controller;

import com.projectBackend.model.HotelBooking;
import com.projectBackend.repositories.HotelBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/hotelbooking")
@CrossOrigin(origins = "*")
public class HotelBookingController {

    @Autowired
    private HotelBookingRepository bookingRepo;

    @PostMapping
    public HotelBooking createBooking(@RequestBody HotelBooking booking) {
        return bookingRepo.save(booking);
    }

    @GetMapping("/{email}")
    public List<HotelBooking> getHotelBookingOfUser(@PathVariable String email) {
        return bookingRepo.findByEmail(email);
    }

}
