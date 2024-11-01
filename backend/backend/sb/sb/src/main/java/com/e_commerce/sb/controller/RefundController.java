package com.e_commerce.sb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.e_commerce.sb.service.RefundService;

@RestController
@RequestMapping
public class RefundController {
	
	@Autowired
	private RefundService refundService;
		
	
}

