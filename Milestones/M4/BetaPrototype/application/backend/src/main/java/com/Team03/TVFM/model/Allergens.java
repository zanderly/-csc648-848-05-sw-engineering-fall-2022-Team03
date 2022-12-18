package com.Team03.TVFM.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Allergens {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id")
    private Long id;
    @Column(name = "milk")
    private int milk;
    @Column(name = "eggs")
    private int eggs;
    @Column(name = "peanut")
    private int peanut;
    @Column(name = "soy")
    private int soy;
    @Column(name = "wheat")
    private int wheat;
    @Column(name = "fish")
    private int fish;
    @Column(name = "shellfish")
    private int shelfish;
    @Column(name = "tree nut")
    private int tree_nut;
}
