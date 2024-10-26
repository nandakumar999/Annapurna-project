package com.e_commerce.sb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.e_commerce.sb.entity.Payment;


@Repository
public interface PaymentRepository extends JpaRepository<Payment,Integer> {

}
