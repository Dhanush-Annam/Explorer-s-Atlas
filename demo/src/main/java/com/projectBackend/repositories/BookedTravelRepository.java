package com.projectBackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectBackend.model.BookedTravel;

public interface BookedTravelRepository extends JpaRepository<BookedTravel, String> {
}