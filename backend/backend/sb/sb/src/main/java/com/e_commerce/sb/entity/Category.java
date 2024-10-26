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
@Data
@Builder
@Entity
@Table(name = "category")
@NoArgsConstructor
@AllArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id", nullable = false)
    private Long categoryId;

    @Column(nullable = false, length = 100)
    private String categoryName;
    
    
    

	public Long getCategoryId() {
		return categoryId;
	}




	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}




	public String getCategoryName() {
		return categoryName;
	}




	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}




	@Override
	public String toString() {
		return "Category [categoryId=" + categoryId + ", categoryName=" + categoryName + "]";
	}
    
    
    
}
