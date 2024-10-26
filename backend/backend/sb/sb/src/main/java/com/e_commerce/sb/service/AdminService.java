package com.e_commerce.sb.service;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
import com.e_commerce.sb.entity.Admin;
import com.e_commerce.sb.repository.AdminRepository;
 
@Service
public class AdminService {
	@Autowired
	private AdminRepository adminRepository;
	public Admin insert(Admin admin) {
		return adminRepository.save(admin);
	}
 
	public boolean authenticate(String adminPh, String adminPassword) {
//		System.out.println(adminPh +" : "+adminPassword);
//		Admin admin=adminRepository.getByAdminPhNo(adminPh);
//		System.out.println(admin);
//		return admin !=null && (adminPassword ==(admin.getAdminPhNo()));
		
		
		
		
		Admin admin= adminRepository.findByAdminPhNo(adminPh);
		
		return (admin!=null &&  admin.getAdminPassword().equals(adminPassword) ); 
			
			
		
	} 
 
	public void getById(Long adminId) {
		adminRepository.findById(adminId);
	}
 
	public void getByName(String adminName) {
		adminRepository.findByAdminName(adminName);
	}
	
	
	public Admin getByNo(String phno) {
		return adminRepository.findByAdminPhNo(phno);
	}
}

