package com.e_commerce.sb.entity;

import java.math.BigInteger;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="product_grams_price")
public class ProductPrice {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="product_grams_price_id")
	private Long productCostId;
	@Column(name="product_id")
	private Long productId;
	@Column(name="product_grams")
	private BigInteger productGrams;
	
	
	@Column(name="product_price")
	private String productCost;
	
	
	
	
	
	
	

	
	
	
	
	public ProductPrice() {
		super();
	}
	public ProductPrice(Long productCostId, Long productId, BigInteger productGrams, String productCost) {
		super();
		this.productCostId = productCostId;
		this.productId = productId;
		this.productGrams = productGrams;
		this.productCost = productCost;
	}
	public Long getProductCostId() {
		return productCostId;
	}
	public void setProductCostId(Long productCostId) {
		this.productCostId = productCostId;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public BigInteger getProductGrams() {
		return productGrams;
	}
	public void setProductGrams(BigInteger productGrams) {
		this.productGrams = productGrams;
	}
	public String getProductCost() {
		return productCost;
	}
	public void setProductCost(String productCost) {
		this.productCost = productCost;
	}
	@Override
	public String toString() {
		return "ProductPrice [productCostId=" + productCostId + ", productId=" + productId + ", productGrams="
				+ productGrams + ", productCost=" + productCost + "]";
	}
	
	
}