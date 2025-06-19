package com.projectBackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectBackend.model.UserBooking;

@Repository
public interface UserBookingRepository extends JpaRepository<UserBooking, String> {
}

