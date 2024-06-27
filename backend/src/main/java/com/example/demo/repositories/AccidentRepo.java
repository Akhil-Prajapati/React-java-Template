package com.example.demo.repositories;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.models.Accident;

public interface AccidentRepo extends JpaRepository<Accident, Long> {

    @Query(nativeQuery = true, value = "select * from accident_details ")
    List<Map<String, Object>> getAccidentDetails();

}
