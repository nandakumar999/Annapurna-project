package com.e_commerce.sb.controller;
 
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e_commerce.sb.entity.Product;
import com.e_commerce.sb.service.ProductService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/product")
public class ProductController {
	@Autowired
	private ProductService productService;

	
	@GetMapping
	public List<Product> getAll(){
		return productService.getAll();
	}
	
	
	
	
	@GetMapping("/{name}")
	public Product getByName(@PathVariable String name) {
		return productService.getByName(name);
	}

	@PostMapping("/prod")
	public ResponseEntity<Product> insert(@RequestBody Product product) {
		Product productSaved =productService.insert(product);
		return ResponseEntity.status(201).body(productSaved);
	}

	@DeleteMapping("{name}")
	public ResponseEntity<String> remove(@PathVariable String name){
		return  productService.remove(name) ?  ResponseEntity.ok("DELETED"):  ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product Not Found");

	}

	@PutMapping("/{id}")
	public Optional<Product> edit(@PathVariable Long id,@RequestBody Product product){
		return productService.update(id,product);
	}

	@GetMapping("/stockupdate")
	public List<String > Stockupdate(){
		return productService.stocksUpdate();
	}
}