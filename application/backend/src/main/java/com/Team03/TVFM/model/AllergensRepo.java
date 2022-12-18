package com.Team03.TVFM.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AllergensRepo extends JpaRepository<Allergens, Long> {

    //query to find allergens with an id
    @Query(value = "SELECT * FROM allergens WHERE id = ?1", nativeQuery = true)
    Allergens findAllergensByID(Long id);
}
