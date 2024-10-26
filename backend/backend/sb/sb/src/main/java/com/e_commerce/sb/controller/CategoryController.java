package com.e_commerce.sb.controller;
 
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.e_commerce.sb.entity.Category;
import com.e_commerce.sb.service.CategoryService;
@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/category")
public class CategoryController {
	@Autowired
	private CategoryService categoryService;
	@GetMapping
	private List<Category> getAll(){
		return categoryService.getAll();
	}
	@PostMapping
	private ResponseEntity<String> insert(@RequestBody Category category){
		categoryService.insert(category);
		return ResponseEntity.status(201).body("Category Created");
	}
	@DeleteMapping("/{id}")
	private ResponseEntity<String> remove(@PathVariable Long id){
		categoryService.remove(id);
		return ResponseEntity.status(201).body("deleted");
				}
	
	@PutMapping("/{id}")
	public Optional<Category> updateCategory(@PathVariable Long id, @RequestBody Category category){
	
		return (categoryService.updateCategory(id, category));
	}

}