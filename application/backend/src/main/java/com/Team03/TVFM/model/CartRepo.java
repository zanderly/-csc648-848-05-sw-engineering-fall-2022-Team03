package com.Team03.TVFM.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CartRepo extends JpaRepository<Cart, Long>
{
    @Query(value = "SELECT * FROM cart WHERE customer_id = ?1", nativeQuery = true)
    Cart findCartByCustomerID(long id);

    @Query(value = "SELECT * FROM cart WHERE vendor_id = ?1", nativeQuery = true)
    Cart findCartByVendorID(long id);

    default Cart findCartByAccountID(long id, boolean isVendor) {
        if (isVendor) {
            return findCartByVendorID(id);
        } else {
            return findCartByCustomerID(id);
        }
    }
}
