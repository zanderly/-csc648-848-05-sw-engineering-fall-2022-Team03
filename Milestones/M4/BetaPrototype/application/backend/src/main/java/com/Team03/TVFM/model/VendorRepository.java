package com.Team03.TVFM.model;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VendorRepository extends JpaRepository<Vendor, Long> {
    @Query(value = "SELECT * FROM vendor WHERE email LIKE %?1% AND password LIKE %?2%", nativeQuery = true)
    List<Vendor> findVendor(String email, String password);

    @Query(value = "SELECT name FROM vendor WHERE email LIKE %?1%", nativeQuery = true)
    String vendorName(String email);

    @Query(value = "SELECT lastname FROM vendor WHERE email LIKE %?1%", nativeQuery = true)
    String vendorLastname(String email);

    @Query(value = "SELECT email FROM vendor WHERE email LIKE %?1%", nativeQuery = true)
    String findVendorEmail(String email);

    @Query(value = "SELECT id FROM vendor WHERE email LIKE %?1%", nativeQuery = true)
    String findVendorID(String email);
}
