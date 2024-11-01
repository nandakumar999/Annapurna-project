package com.e_commerce.sb.service;

import java.math.BigInteger;
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
	
	
	public ProductPrice productPrice(Long productId, BigInteger grams) {
		return productPriceRepository.findByProductIdAndProductGrams(productId, grams);
		
				//.stream()
				
//				
//	            .filter(price -> price.getProductGrams()==(grams))
//	            
//	            
//	            .map(ProductPrice::getProductCost).findAny();

	}

	
}
