package com.example.demo.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Auth;
import com.example.demo.repositories.AuthRepo;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthRepo authrepo;

    @PostMapping("/user-sign-up")
    public Map<String, Object> userSignUp(@RequestBody Auth body) {

        authrepo.save(body);
        return Map.of("message", "User Create Successfully");
    }

    @PostMapping("/user-sign-in")
    public Map<String, Object> userSignIn(@RequestBody Auth body) {

        String username = body.getUsername();
        String password = body.getPassword();

        Map<String, Object> user = authrepo.getUser(username, password);
        if ((Long) user.get("id") != null) {
            return Map.of("message", "User Login Successfull", "users", user);
        }
        return Map.of("message", false);
    }

}