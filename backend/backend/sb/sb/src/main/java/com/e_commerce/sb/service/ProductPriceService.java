package com.e_commerce.sb.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.e_commerce.sb.entity.ProductPrice;
import com.e_commerce.sb.repository.ProductPriceRepository;

@Service
public class ProductPriceService {

	@Autowired
	private ProductPriceRepository productPriceRepository;
	
	public List<ProductPrice> getAll(){
		return productPriceRepository.findAll();
	}
	
	
	public Optional<String> productPrice(Long productId, Long grams) {
		return productPriceRepository.findByProductId(productId).stream()
	            .filter(price -> price.getProductGrams()==(grams))
	            .map(ProductPrice::getProductCost).findAny();

	}

	
}
