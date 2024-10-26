package com.e_commerce.sb.entity;
 
 
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
 
@Entity
@Table(name = "admin")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private Long adminId;
 
    @Column(nullable = false, length = 100)
    private String adminName;
 
    @Column(nullable = false, length = 15)
    private String adminPhNo;
 
    @Column(nullable = false, length = 255)
    private String adminPassword;


 
	public Admin() {
		super();
	}
 
	public Admin(Long adminId, String adminName, String adminPhNo, String adminPassword) {
		super();
		this.adminId = adminId;
		this.adminName = adminName;
		this.adminPhNo = adminPhNo;
		this.adminPassword = adminPassword;
	}
 
	public Long getAdminId() {
		return adminId;
	}
 
	public void setAdminId(Long adminId) {
		this.adminId = adminId;
	}
 
	public String getAdminName() {
		return adminName;
	}
 
	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}
 
	public String getAdminPhNo() {
		return adminPhNo;
	}
 
	public void setAdminPhNo(String adminPhNo) {
		this.adminPhNo = adminPhNo;
	}
 
	public String getAdminPassword() {
		return adminPassword;
	}
 
	public void setAdminPassword(String adminPassword) {
		this.adminPassword = adminPassword;
	}
 
	@Override
	public String toString() {
		return "Admin [adminId=" + adminId + ", adminName=" + adminName + ", adminPhNo=" + adminPhNo
				+ ", adminPassword=" + adminPassword + "]";
	}



}

