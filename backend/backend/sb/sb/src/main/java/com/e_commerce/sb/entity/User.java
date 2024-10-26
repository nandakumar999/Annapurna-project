package com.e_commerce.sb.entity;
 
 
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
 
@Entity
@Table(name = "\"user\"")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id",nullable = false)
    private Long userId;
 
    @Column(nullable = false, length = 100)
    private String userName;
 
    @Column(nullable = false, length = 15)
    private String userPhNo;
 
    @Column(nullable = false, length = 255)
    private String userPassword;
 
    @Column(nullable = false)
    private String userAddress;
    @Column(nullable = false)
    private String userPincode;
    @Column(nullable = false)
    private String userCity;
    @Column(nullable = false)
    private String userState;


 
	public User() {
		super();
	}
 
	public User(Long userId, String userName, String userPhNo, String userPassword, String userAddress,
			String userPincode, String userCity, String userState) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.userPhNo = userPhNo;
		this.userPassword = userPassword;
		this.userAddress = userAddress;
		this.userPincode = userPincode;
		this.userCity = userCity;
		this.userState = userState;
	}
 
	public Long getUserId() {
		return userId;
	}
 
	public void setUserId(Long userId) {
		this.userId = userId;
	}
 
	public String getUserName() {
		return userName;
	}
 
	public void setUserName(String userName) {
		this.userName = userName;
	}
 
	public String getUserPhNo() {
		return userPhNo;
	}
 
	public void setUserPhNo(String userPhNo) {
		this.userPhNo = userPhNo;
	}
 
	public String getUserPassword() {
		return userPassword;
	}
 
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
 
	public String getUserAddress() {
		return userAddress;
	}
 
	public void setUserAddress(String userAddress) {
		this.userAddress = userAddress;
	}
 
	public String getUserPincode() {
		return userPincode;
	}
 
	public void setUserPincode(String userPincode) {
		this.userPincode = userPincode;
	}
 
	public String getUserCity() {
		return userCity;
	}
 
	public void setUserCity(String userCity) {
		this.userCity = userCity;
	}
 
	public String getUserState() {
		return userState;
	}
 
	public void setUserState(String userState) {
		this.userState = userState;
	}
 
	@Override
	public String toString() {
		return "User [userId=" + userId + ", userName=" + userName + ", userPhNo=" + userPhNo + ", userPassword="
				+ userPassword + ", userAddress=" + userAddress + ", userPincode=" + userPincode + ", userCity="
				+ userCity + ", userState=" + userState + "]";
	}

}