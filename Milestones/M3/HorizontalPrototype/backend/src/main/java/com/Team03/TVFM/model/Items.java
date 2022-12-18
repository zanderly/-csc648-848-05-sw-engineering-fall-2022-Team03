package com.Team03.TVFM.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
//@NamedNativeQuery(name = "Items.findItem", query = "SELECT * FROM items where name = ?", resultClass = Items.class)
public class Items {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id")
    private Long id;

    @Column(name = "name")
    private String name;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "price")
    private double price;
    @Column(name = "description")
    private String description;
    @Column(name = "nutrition")
    private String nutrition;

    /*public Items(String name, int quantity, double price, String description, String nutrition){
        super();
        this.name = name; 
        this.quantity = quantity;
        this.price = price;
        this.description = description;
        this.nutrition = nutrition;
    }*/
}
