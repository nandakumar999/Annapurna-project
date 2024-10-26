package com.e_commerce.sb.controller;
 
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.web.bind.annotation.RestController;
 
import com.e_commerce.sb.entity.User;

import com.e_commerce.sb.service.UserService;
 
@RestController

@CrossOrigin(origins="http://localhost:3000/")

@RequestMapping("/user")

public class UserController {
 
	

	@Autowired

	private UserService userService;

 
  

	@PostMapping

	public ResponseEntity<User> createUser(@RequestBody User user){

		User savedUser=userService.insert(user);

		return ResponseEntity.status(201).body(savedUser);

	}

	@PostMapping("/login")

	public boolean login(@RequestBody User user) {

	return	userService.authenticate(user.getUserPhNo(),user.getUserPassword());

}

}

 