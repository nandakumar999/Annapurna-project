package com.e_commerce.sb.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.e_commerce.sb.entity.Order;

import com.e_commerce.sb.repository.OrderRepository;

@Service
public class OrderService {
	@Autowired
	private OrderRepository orderRepository;
	


	public Order insert(Order order) {
		
		return orderRepository.save(order);
	}

	

	 
	 
	 
	 
	 
	 
	 
//	 
//	 public Optional<Order> getById(Long id) {
//			return orderRepository.findById(id);
//		}
	
	
	public List<Order> getAll() {
		
		return orderRepository.findAll();
	}

	


	
	}
