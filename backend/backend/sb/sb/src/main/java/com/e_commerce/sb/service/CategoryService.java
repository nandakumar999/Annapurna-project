package com.e_commerce.sb.service;
 
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.e_commerce.sb.entity.Category;
import com.e_commerce.sb.repository.CategoryRepository;

 
@Service
public class CategoryService {
	@Autowired
	private CategoryRepository categoryRepository;
 
	public void insert(Category category) {
		categoryRepository.save(category);

	}
 
	public List<Category> getAll() {
		return categoryRepository.findAll();
	}
 
	public void remove(Long id) {
		 categoryRepository.deleteById(id);;
	}

	public Optional<Category> updateCategory(Long id, Category category) {
	
		return categoryRepository.findById(id).map(updatedCategory->{
			updatedCategory.setCategoryName(category.getCategoryName());
			return categoryRepository.save(updatedCategory);
		}) ;
	}
 
}
