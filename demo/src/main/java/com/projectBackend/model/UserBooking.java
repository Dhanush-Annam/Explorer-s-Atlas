package com.projectBackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;




@Entity
@Table(name = "user_bookings")
public class UserBooking {
    
    @Id
    private String userEmail;
    
    @Column(name = "booking_id", nullable = false)
    private String bookingId;
    
    //defauft constructor
    public UserBooking() {}

    public UserBooking(String userEmail, String bookingId) {
        this.userEmail = userEmail;
        this.bookingId = bookingId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

}