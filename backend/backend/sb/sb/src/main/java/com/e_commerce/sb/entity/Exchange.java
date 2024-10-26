package com.e_commerce.sb.entity;


import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "exchange")
public class Exchange {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exchange_id", nullable = false)
    private Long exchangeId; // Primary key
    
    @Column(nullable = false)
    private Long orderId; // Foreign key referencing ordertable

    @Column(nullable = false)
    private Long userId; // Foreign key referencing user

    @Column(length = 500)
    private String reason; // Reason for the exchange

    @Column(length = 50)
    private String status; // Status of the exchange

    @Column(nullable = false)
    private LocalDate exchangeDate ; // Exchange request date

    @Column(nullable = false)
    private Long productId; // Foreign key referencing the original product
    
    @Column(nullable = false)
    private Long newProductId; // Foreign key referencing the new product being exchanged
}
