package com.example.demo.repositories;

import com.example.demo.models.Agri;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface AgriRepo extends JpaRepository<Agri, Long> {
    @Query(nativeQuery = true, value = """
            select * from agridetails
            """)
    List<Map<String, Object>> getdata();

    @Modifying
    @Query(nativeQuery = true, value = """
            delete from agridetails WHERE id = ?1
            """)
    void deleteAgriData(Long id);

}
