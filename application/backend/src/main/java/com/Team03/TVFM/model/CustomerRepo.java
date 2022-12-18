package com.Team03.TVFM.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepo extends JpaRepository<Customer, Long> {

    //query to find a customer with an email and password //for login
    @Query(value = "SELECT * FROM customer WHERE email = ?1 AND password = ?2", nativeQuery = true)
    Customer findCustomer(String email, String password);

    //query to find customer id with an email
    @Query(value = "SELECT id FROM customer WHERE email = ?1", nativeQuery = true)
    Long findCustomerID(String email);

    @Query(value = "SELECT email FROM customer WHERE email = ?1", nativeQuery = true)
    String findCustomerEmail(String email);

    //query to find customer information with an id
    @Query(value = "SELECT * FROM Info WHERE CustomerAccount_id = ?1", nativeQuery = true)
    Info findCustomerInfo(int customerID);
}
