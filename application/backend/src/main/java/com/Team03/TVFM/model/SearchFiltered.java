package com.Team03.TVFM.model;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;
@Data
public class SearchFiltered {
    public String getAllergens() {
        return allergens;
    }

    public String getItem() {
        return item;
    }

    private String allergens;
    private String item;

}
