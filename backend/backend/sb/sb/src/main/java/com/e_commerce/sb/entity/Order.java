package com.e_commerce.sb.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@Entity
@Table(name = "ordertable")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

   
    @JoinColumn(name = "user_id", nullable = false) // Assuming user_id is NOT NULL in the database
    private Long userId;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "order_date")
    private LocalDateTime date;
    

    @Column(length = 255) // Length matches the SQL definition
    private String status;

    @Column(nullable = false)
    private int quantity;

   
    @JoinColumn(name = "product_id")
    private Long productId;

    // Default constructor
    public Order() {
    }

    public Order(Long orderId, Long userId, BigDecimal price, LocalDateTime date, String status, int quantity,
			Long productId) {
		super();
		this.orderId = orderId;
		this.userId = userId;
		this.price = price;
		this.date = date;
		this.status = status;
		this.quantity = quantity;
		this.productId = productId;
	}

	// Constructor with required fields
   
	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "Order [orderId=" + orderId + ", userId=" + userId + ", price=" + price + ", date=" + date + ", status="
				+ status + ", quantity=" + quantity + ", productId=" + productId + "]";
	}
	
	

}
