package com.Team03.TVFM.model;

import lombok.Data;
import javax.persistence.Transient;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.io.Serializable;

@Data
@Entity
public class OrderDetails implements Serializable{
    /*private static final long serialVersionUID = 7550745928843183535L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name ="orderDetails_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    //@JoinColumn(name = "Purchases", nullable = false, //
      //      foreignKey = @ForeignKey(name = "FK_ORDER_DETAIL_PURCHASES"))
    private Purchases purchases;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Items", //
            foreignKey = @ForeignKey(name = "FK_ORDER_DETAIL_ITEMS"))
    private Items items;

    @Column(name = "Quantity", nullable = false)
    private int quantity;

    public Purchases getOrder() {
        return purchases;
    }

    public void setOrder(Purchases order) {
        this.purchases = order;
    }

    public Items getItems() {
        return items;
    }

    public void setItems(Items item) {
        this.items = item;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }*/

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name ="orderDetails_id")
    private int id;
    @Column(name ="order_id")
    private int order_id;
    @Column(name ="items_id")
    private Long items_id;
    @Column(name ="quantity")
    private int quantity;
}
