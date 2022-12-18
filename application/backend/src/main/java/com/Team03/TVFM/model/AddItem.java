package com.Team03.TVFM.model;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;
@Data

public class AddItem {

    /*public AddItem(Vendor vendor, Items item,Allergens allergens){
        this.vendor=vendor;
        this.item=item;
        this.allergens=allergens;
    }*/

    public String getVendor() {
        return vendor;
    }

    public String getItem() {
        return item;
    }

    public String getAllergens() {
        return allergens;
    }


    private String vendor;
    private String item;
    private String allergens;
}
