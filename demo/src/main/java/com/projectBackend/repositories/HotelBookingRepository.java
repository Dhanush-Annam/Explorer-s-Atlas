package com.projectBackend.repositories;

import com.projectBackend.model.HotelBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HotelBookingRepository extends JpaRepository<HotelBooking, Long> {
    public List<HotelBooking> findByEmail(String email);
}
