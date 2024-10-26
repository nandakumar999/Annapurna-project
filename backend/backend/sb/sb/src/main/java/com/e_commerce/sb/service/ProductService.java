package com.e_commerce.sb.service;
 
import java.util.List;
import java.util.Optional;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
import com.e_commerce.sb.entity.Product;
import com.e_commerce.sb.repository.ProductRepository;
 
import jakarta.transaction.Transactional;
 
@Service
public class ProductService {
	@Autowired
	private ProductRepository  productRepository;
 
	public List<Product> getAll() {
		 List<Product> products = productRepository.findAll();
		 System.out.println("Products: " + products);
		return productRepository.findAll();
	}
 
	public Product getByName(String name) {
		return productRepository.findByProductName(name);
	}
 
	public Product insert(Product product) {
		return productRepository.save(product);
	}
	@Transactional
	public Boolean remove(String name) {
	    Product product = productRepository.findByProductName(name);
	    if (product != null) {
	        productRepository.deleteByProductName(name);
	        return true; // Indicate that deletion was successful
	    }
	    return false; // Indicate that the product was not found
	}
 
	public Optional<Product> update(Long id, Product product) {
		return productRepository.findById(id).map(
				updatedProduct-> {
					updatedProduct.setCategory_id(product.getCategory_id());
					updatedProduct.setProductName(product.getProductName());
					updatedProduct.setProductImg(product.getProductImg());
					updatedProduct.setPrice(product.getPrice())	;
					updatedProduct.setProductStock(product.getProductStock());
					return productRepository.save(updatedProduct);
					}
				);
 
		
	}

 
}