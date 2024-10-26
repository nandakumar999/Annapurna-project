package com.e_commerce.sb.entity;
 
 
import java.math.BigDecimal;
 
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
@Table(name = "product")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="product_id")
    private Long productId;
 
    @Column(name="product_name" ,nullable = false, length = 100)
    private String productName;
 
    @Column(name="product_price" ,nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
    @Column(name="product_stock", nullable = false)
    private Integer productStock;
 
    private String productImg;
 
    @Column(name="category_id")
    private Long category_id;
    
    
    private String AdminName;


 
	public Product() {
		super();
	}
 
	
 
	public Product(Long productId, String productName, BigDecimal price, Integer productStock, String productImg,
			Long category_id, String adminName) {
		super();
		this.productId = productId;
		this.productName = productName;
		this.price = price;
		this.productStock = productStock;
		this.productImg = productImg;
		this.category_id = category_id;
		AdminName = adminName;
	}



	public Long getProductId() {
		return productId;
	}
 
	public void setProductId(Long productId) {
		this.productId = productId;
	}
 
	public String getProductName() {
		return productName;
	}
 
	public void setProductName(String productName) {
		this.productName = productName;
	}
 
	public BigDecimal getPrice() {
		return price;
	}
 
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
 
	public Integer getProductStock() {
		return productStock;
	}
 
	public void setProductStock(Integer productStock) {
		this.productStock = productStock;
	}
 
	public String getProductImg() {
		return productImg;
	}
 
	public void setProductImg(String productImg) {
		this.productImg = productImg;
	}
 
	public Long getCategory_id() {
		return category_id;
	}
 
	public void setCategory_id(Long category_id) {
		this.category_id = category_id;
	}
	
	
	
 
	public String getAdminName() {
		return AdminName;
	}



	public void setAdminName(String adminName) {
		AdminName = adminName;
	}



	@Override
	public String toString() {
		return "Product [productId=" + productId + ", productName=" + productName + ", price=" + price
				+ ", productStock=" + productStock + ", productImg=" + productImg + ", category_id=" + category_id
				+ ", AdminName=" + AdminName + "]";
	}



	
	


}

