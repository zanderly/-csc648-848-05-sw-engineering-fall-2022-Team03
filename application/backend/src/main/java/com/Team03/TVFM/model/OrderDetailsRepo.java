package com.Team03.TVFM.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderDetailsRepo extends JpaRepository<OrderDetails, Long>
{
    //query to find the last purchase with an id
    @Query(value = "SELECT * from orderdetails WHERE order_id = ?1", nativeQuery = true)
    List<OrderDetails> findLastPurchase(long id);
}