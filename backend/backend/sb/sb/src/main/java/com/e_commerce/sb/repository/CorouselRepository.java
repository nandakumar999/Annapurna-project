package com.e_commerce.sb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.e_commerce.sb.entity.Corousel;

@Repository
public interface CorouselRepository extends JpaRepository<Corousel,Long> {

	
}
