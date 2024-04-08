package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.User;
import com.example.demo.repositories.UserRepo;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

  @Autowired
  JdbcTemplate template;

  @Autowired
  UserRepo userRepo;

  @PostMapping("/signup")
  public String signUp(@RequestBody User body) {
    userRepo.save(body);
    System.out.println("clled" + body);
    return "User Registration Successfully";
  }

  @GetMapping("/get-user-data")
  public List<Map<String, Object>> getUserData() {
    String q = "select * from signup_user order by id desc";
    return template.queryForList(q);
  }

  @Modifying
  @PostMapping("/update-user")
  public String updateUser(@RequestBody User body) {

    String q = "UPDATE signup_user SET email='" + body.getEmail() + "', password='" + body.getPassword() + "' WHERE id="
        + body.getId();
    template.update(q);
    return "User is Updated";
  }

  @Modifying
  @PostMapping("/delete-user")
  public String deleteUser(@RequestBody User body) {

    String q = "DELETE FROM signup_user WHERE id=" + body.getId();
    template.update(q);
    return "You are deleted😈😈";
  }

}
