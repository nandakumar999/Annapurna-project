package com.e_commerce.sb.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.e_commerce.sb.entity.Corousel;
import com.e_commerce.sb.service.CorouselService;

@RestController
@RequestMapping("/corousel")
public class CorouselController {

	
	@Autowired
	private CorouselService corouselService;
	
	@GetMapping
	public List<Corousel> getAll(){
		return corouselService.getCorousel();
	}
	
	
	@PostMapping
	public ResponseEntity<Long> insert(@RequestParam("file") MultipartFile file){
		
		return ResponseEntity.status(201).body(	corouselService.insert(file));
	}
	
	
	
	
	@GetMapping("/{id}")
		public ResponseEntity<byte[]> getImg(@PathVariable Long id){
			
			   Optional<Corousel> imageOptional = corouselService.getImage(id);
			   
			   if(imageOptional.isPresent()) {
				   Corousel img = imageOptional.get();
				   HttpHeaders headers=new HttpHeaders();
				   headers.setContentType(MediaType.IMAGE_JPEG);
					return new ResponseEntity<>(img.getCorouselImg(),headers, HttpStatus.OK);
			   }
			   
			   else {
				   return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Image not found
			   }
			
		}
	
	
}
