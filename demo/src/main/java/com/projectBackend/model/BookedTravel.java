package com.projectBackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.UUID; // Import UUID

@Entity
@Table(name = "booked_travel")
public class BookedTravel {

    @Id
    private String id;
    private String email;
    private String name;
    private String destination;
    private LocalDate travelDate;
    private LocalDate returnDate;


    public BookedTravel() {
        this.id = UUID.randomUUID().toString();
    }

    public BookedTravel(String email, String name, String destination, LocalDate travelDate, LocalDate returnDate) {
        this();
        this.email = email;
        this.name = name;
        this.destination = destination;
        this.travelDate = travelDate;
        this.returnDate = returnDate;
    }
    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public LocalDate getTravelDate() {
        return travelDate;
    }

    public void setTravelDate(LocalDate travelDate) {
        this.travelDate = travelDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }
}