package com.e_commerce.sb.entity;



import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tracking_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrackingDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="tracking_id",nullable = false)
    private Long trackingId;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @Column(nullable = false)
    private String trackingNumber;
    @Column(nullable = false)
    private String status;
    @Column(nullable = false)
    private Date estimateDeliveryDate;
}

