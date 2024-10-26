package com.e_commerce.sb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e_commerce.sb.entity.Category;

public interface CategoryRepository extends JpaRepository<Category,Long> {

}
