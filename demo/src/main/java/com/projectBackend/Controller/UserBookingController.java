
package com.projectBackend.Controller;

import com.projectBackend.model.BookedTravel;
import com.projectBackend.model.UserBooking;
import com.projectBackend.repositories.BookedTravelRepository;
import com.projectBackend.repositories.UserBookingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/bookings")
public class UserBookingController {

    @Autowired
    private BookedTravelRepository bookedTravelRepo;

    @Autowired
    private UserBookingRepository userBookingRepo;

    @PostMapping("/add")
    public BookedTravel addBooking(@RequestParam String email,
            @RequestParam String name,
            @RequestParam String destination,
            @RequestParam LocalDate travelDate,
            @RequestParam LocalDate returnDate){
        BookedTravel booking = new BookedTravel(email, name, destination, travelDate, returnDate);
        booking = bookedTravelRepo.save(booking);
        UserBooking userbook = new UserBooking(email, booking.getId().toString());
        userBookingRepo.save(userbook);
        return booking;
    }

    @GetMapping("/user")
    public List<BookedTravel> getBookingsByEmail(String email){
        return bookedTravelRepo.findAll()
                .stream()
                .filter(booking -> booking.getEmail().equals(email))
                .toList();
    }

    @GetMapping("/user/{email}")
    public List<BookedTravel> getBookingsByEmailurl(@PathVariable String email) {
        return bookedTravelRepo.findAll()
                .stream()
                .filter(booking -> booking.getEmail().equals(email))
                .toList();
    }
    

}
