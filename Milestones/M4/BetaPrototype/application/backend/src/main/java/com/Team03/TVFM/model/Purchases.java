package com.Team03.TVFM.model;

import lombok.Data;
import javax.persistence.Transient;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Purchases {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="order_id")
    private int id;
    @Column(name = "customer_id")
    private Long customer_id;
    @Column(name = "order_date")
    private String order_date;
    @Column(name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "items_id", referencedColumnName = "id")
    private Items order;

    @Transient
    private List<Items> Items;
    @Transient
    private Items item;
}
