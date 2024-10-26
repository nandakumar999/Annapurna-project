package com.e_commerce.sb.repository;
 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
import com.e_commerce.sb.entity.Product;
 
 
@Repository
public interface ProductRepository extends JpaRepository<Product,Long>{
	public Product findByProductName(String productName);
	public void deleteByProductName(String productName);
}