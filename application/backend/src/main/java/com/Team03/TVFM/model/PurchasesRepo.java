package com.Team03.TVFM.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PurchasesRepo extends JpaRepository<Purchases, Long> {

    //query to find the purchases from customer
    @Query(value = "SELECT * FROM Purchases WHERE Customer_id = ?1 LIMIT ?2", nativeQuery = true)
    List<Purchases> findPurchasesByCustomerID(long id, long limit);

    //query to find the id purchases
    @Query(value = "SELECT Item_id FROM Purchase_has_Item WHERE Purchase_order_id = ?1", nativeQuery = true)
    List<Integer> findItemIDInPurchase(long id);

    //returns max value from id column
    @Query(value = "SELECT MAX(id) FROM Purchases")
    int maxID();

    //query to find last purchase
    @Query(value = "SELECT * FROM Purchases WHERE customer_id = ?1", nativeQuery = true)
    List<Purchases> findLastPurchase(long id);

    //query to get last purchase
    @Query(value = "SELECT order_id FROM Purchases WHERE order_id = (SELECT MAX(order_id) FROM Purchases)", nativeQuery = true)
    Long getPurchases();
}
