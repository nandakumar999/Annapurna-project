package com.e_commerce.sb.service;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
import com.e_commerce.sb.entity.User;
import com.e_commerce.sb.repository.UserRepository;
 
@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
 
	public User insert(User user) {
		return userRepository.save(user);
	}
 
	public boolean authenticate(String phNo, String password) {
		User user=userRepository.findByUserPhNo(phNo);
		return user!=null && user.getUserPassword().equals(password);
	}
 
}

