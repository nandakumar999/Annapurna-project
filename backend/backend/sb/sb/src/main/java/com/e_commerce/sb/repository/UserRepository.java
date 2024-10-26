package com.e_commerce.sb.repository;
 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
import com.e_commerce.sb.entity.User;
 
 
@Repository
public interface UserRepository extends JpaRepository<User,Long> {
 
 
	User findByUserPhNo(String phNo);
 
}