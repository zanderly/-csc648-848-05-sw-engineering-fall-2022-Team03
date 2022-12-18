package com.Team03.TVFM.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.Team03.TVFM.model.Purchases;

import java.util.List;

public interface PurchasesRepo extends JpaRepository<Purchases, Long>
{
    @Query(value = "SELECT * FROM Purchases WHERE Customer_id = ?1 LIMIT ?2", nativeQuery = true)
    List<Purchases> findPurchasesByCustomerID(long id, long limit);

    @Query(value = "SELECT Item_id FROM Purchase_has_Item WHERE Purchase_order_id = ?1", nativeQuery = true)
    List<Integer> findItemIDInPurchase(long id);

    @Query(value = "SELECT MAX(id) FROM Purchases")
    int maxID();
}
