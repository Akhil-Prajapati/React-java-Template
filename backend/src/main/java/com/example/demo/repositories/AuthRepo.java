package com.example.demo.repositories;

import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.models.Auth;

public interface AuthRepo extends JpaRepository<Auth, Long> {

    @Query(nativeQuery = true, value = """
            select * from users where username=?1 and password=?2 limit 1
            """)
    Map<String, Object> getUser(String username, String password);

}
