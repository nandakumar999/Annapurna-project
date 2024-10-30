package com.e_commerce.sb.service;


import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.e_commerce.sb.entity.Corousel;
import com.e_commerce.sb.repository.CorouselRepository;

@Service
public class CorouselService {

	@Autowired
	private CorouselRepository  corouselRepository;
	
	public List<Corousel> getCorousel() {
	return	corouselRepository.findAll();
		 
	}

	public Long insert( MultipartFile file) {
		
		byte[] imgData = null;
		try {
			imgData = file.getBytes();
		} catch (IOException e) {
			
			e.printStackTrace();
		}
		
	Corousel corousel=new Corousel(imgData);
	
		
		return corouselRepository.save(corousel).getCorouselId() ;
	}
	
	
	
	
	
	public Optional<Corousel> getImage(Long id){
		return corouselRepository.findById(id);
	}
	
	
	
	
	
	
	
	
}
