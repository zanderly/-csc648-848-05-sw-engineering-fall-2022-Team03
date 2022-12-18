package com.Team03.TVFM.model;

import lombok.Data;

import javax.persistence.*;

import static com.Team03.TVFM.model.Vendor.getString;

@Data
@Entity
public class Customer{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id")
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "lastname")
    private String lastname;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "vendor")
    private int vendor;
    
    //connects with address table
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "address")
    private Address address;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "cart")
    private Cart cart;

    @Override
    public String toString() {
        return getString(this.id, this.name, this.lastname, this.email , this.vendor, this.address, this.cart);
    }

}
