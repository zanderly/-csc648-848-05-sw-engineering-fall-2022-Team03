package com.Team03.TVFM.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id")
    private Long id;
    @Column(name = "number")
    private int number;
    @Column(name = "street")
    private String street;
    @Column(name = "city")
    private String city;
    @Column(name = "state")
    private String state;
    @Column(name = "zipcode")
    private Long zipcode;

    //connects with customer table info
    @OneToOne(fetch = FetchType.LAZY)
    private Customer customer;

    //connects with vendor table info
    @OneToOne(fetch = FetchType.LAZY)
    private Vendor vendor;

    public Address(){

    }

    public Address(int Number, String street, String city, String State, Long zipCode, Customer customer1) {
        this.number = Number;
        this.street = street;
        this.city = city;
        this.zipcode = zipCode;
        this.state = State;
    }

}