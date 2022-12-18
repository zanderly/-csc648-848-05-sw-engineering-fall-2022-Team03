package com.Team03.TVFM.model;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;

import com.Team03.TVFM.model.Items;

public interface ItemsRepo extends JpaRepository<Items, Long>
{
    //@Query(value = "SELECT * FROM items where name = ?", nativeQuery = true)
    @Query(value = "SELECT * FROM Items WHERE name LIKE %?1% OR description LIKE %?1% OR nutrition LIKE %?1%", nativeQuery = true)
    List<Items> findItem(String name);

    @Query(value = "SELECT * FROM Items WHERE id LIKE %?1%", nativeQuery = true)
    List<Items> findItembyID(long id);

    @Query(value = "SELECT MAX(id) FROM Items")
    int maxID();
}
