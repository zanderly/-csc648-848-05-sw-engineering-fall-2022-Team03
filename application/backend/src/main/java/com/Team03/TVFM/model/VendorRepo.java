package com.Team03.TVFM.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VendorRepo extends JpaRepository<Vendor, Long> {
    //@Query(value = "SELECT * FROM vendor WHERE email LIKE %?1% AND password LIKE %?2%", nativeQuery = true)
    @Query(value = "SELECT * FROM vendor WHERE email = ?1 AND password = ?2", nativeQuery = true)
    Vendor findVendor(String email, String password);

    //query get vendors name from email
    @Query(value = "SELECT name FROM vendor WHERE email = ?1", nativeQuery = true)
    String vendorName(String email);

    //query to find verdors last name from email
    @Query(value = "SELECT lastname FROM vendor WHERE email = ?1", nativeQuery = true)
    String vendorLastname(String email);

    @Query(value = "SELECT email FROM vendor WHERE email = ?1", nativeQuery = true)
    String findVendorEmail(String email);

    //find vendor id with email
    @Query(value = "SELECT id FROM vendor WHERE email = ?1", nativeQuery = true)
    String findVendorID(String email);
}
