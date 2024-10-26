package com.e_commerce.sb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.e_commerce.sb.entity.Order;


@Repository

public interface OrderRepository extends JpaRepository<Order,Long> {

}
