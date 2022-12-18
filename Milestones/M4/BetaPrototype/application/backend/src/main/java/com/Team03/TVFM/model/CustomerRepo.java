package com.Team03.TVFM.model;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepo extends JpaRepository<Customer, Long> {
    @Query(value = "SELECT * FROM customer WHERE email LIKE %?1% AND password LIKE %?2%", nativeQuery = true)
    List<Customer> findCustomer(String email, String password);

    @Query(value = "SELECT id FROM customer WHERE email LIKE %?1%", nativeQuery = true)
    Long findCustomerID(String email);

    @Query(value = "SELECT email FROM customer WHERE email LIKE %?1%", nativeQuery = true)
    String findCustomerEmail(String email);
}
