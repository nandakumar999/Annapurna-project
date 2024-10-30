package com.e_commerce.sb.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.sb.entity.Order;
import com.e_commerce.sb.service.OrderService;





@RestController
@RequestMapping("/order") // Set the base path for the controller
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	
	
		@PostMapping
	    public ResponseEntity<Order> createOrder( @RequestBody Order order) {
	        Order savedOrder = orderService.insert(order);
	        return ResponseEntity.status(201).body(savedOrder); // HTTP 201 Created
	    }
	  
	  
		@GetMapping()
		public List<Order> getAll() {
			return orderService.getAll();
		}

//	
//	@GetMapping("/{id}")
//	public Optional<Order> getById(@Validated @PathVariable Long id) {
//		return orderService.getById(id);
//	}
		
		
}
