package com.e_commerce.sb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.e_commerce.sb.entity.ProductPrice;

@Repository
public interface ProductPriceRepository extends JpaRepository<ProductPrice,Long>{
	List<ProductPrice> findByProductId(Long id);
}
