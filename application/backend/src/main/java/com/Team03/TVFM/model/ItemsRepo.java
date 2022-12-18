package com.Team03.TVFM.model;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ItemsRepo extends JpaRepository<Items, Long>
{
    //@Query(value = "SELECT * FROM items where name = ?", nativeQuery = true)
    @Query(value = "SELECT * FROM items WHERE name LIKE %?1% OR description LIKE %?1% OR nutrition LIKE %?1%", nativeQuery = true)
    List<Items> findItem(String name);

    @Query(value = "SELECT * FROM items WHERE id = ?1", nativeQuery = true)
    Items findItemInfo(Long id);

    @Query(value = "SELECT * FROM items WHERE id = ?1", nativeQuery = true)
    Items findItembyID(long id);

    @Query(value = "SELECT vendor FROM items WHERE id = ?1", nativeQuery = true)
    String findVendor(long id);

    //returns max value from id column
    @Query(value = "SELECT MAX(id) FROM Items")
    int maxID();
}
