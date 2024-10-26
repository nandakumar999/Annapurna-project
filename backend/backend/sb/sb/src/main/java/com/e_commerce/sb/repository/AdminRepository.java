package com.e_commerce.sb.repository;
 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
import com.e_commerce.sb.entity.Admin;
 
 
@Repository
public interface AdminRepository extends JpaRepository<Admin,Long> {
 
	public Admin findByAdminPhNo(String adminPh);
 
	public Admin findByAdminName(String adminName);
 
}