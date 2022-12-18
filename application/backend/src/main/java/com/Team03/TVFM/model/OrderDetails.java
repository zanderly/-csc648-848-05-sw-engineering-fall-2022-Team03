package com.Team03.TVFM.model;

import lombok.Data;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;

@Data
@Entity
public class OrderDetails implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name ="orderDetails_id")
    private long id;

    //connects with purchases table for the info
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    private Purchases purchases;

    //connects with item table
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "item_id", nullable = false)
    @JsonIgnore
    private Items item;

    @Column(name ="quantity")
    private int quantity;
}
