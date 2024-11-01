package com.e_commerce.sb.controller;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.sb.entity.ProductPrice;
import com.e_commerce.sb.service.ProductPriceService;

@RestController
@RequestMapping("/price")
public class ProductPriceController {

	@Autowired
	private ProductPriceService productPriceService;
	
	
	@GetMapping
	public List<ProductPrice> getAll(){
		return productPriceService.getAll();
	}
	
	@GetMapping("/{id}/{weight}")
	public ProductPrice get(@PathVariable Long id, @PathVariable BigInteger weight) {
		
		System.out.println(id +""+weight);
		return productPriceService.productPrice(id, weight);
	}
}
