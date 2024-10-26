package com.e_commerce.sb.controller;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.sb.entity.Admin;
import com.e_commerce.sb.service.AdminService;
 

@CrossOrigin(origins="http://localhost:3000")
@RestController

@RequestMapping("admin")

public class AdminController {

	@Autowired

	private AdminService adminService;

	@PostMapping("/registration")

	public ResponseEntity<Admin> insert(@RequestBody Admin admin){
		System.out.println("Line Controller");

		Admin adminSaved=adminService.insert(admin);
		System.out.println("below 	ine Controller");


		return ResponseEntity.status(201).body(adminSaved);

	}


	@PostMapping("/login")

	public boolean login(@RequestBody Admin admin) {

		System.out.println(admin.getAdminPhNo() +" : "+admin.getAdminPassword());

		return adminService.authenticate(admin.getAdminPhNo(),admin.getAdminPassword())	;

	}
	
	
	
	
	@GetMapping("/{number}")
	public Admin getByNo(@PathVariable String number) {
		return adminService.getByNo(number);
	}
	
	
}