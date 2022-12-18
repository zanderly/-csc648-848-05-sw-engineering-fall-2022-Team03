package com.Team03.TVFM.model;


//class to get items from cart
public class CartInfo {

    private Items items;
    private int quantity;
 
    public Items getItemsInfo() {
        return items;
    }
 
    public void setItemsInfo(Items items) {
        this.items = items;
    }
 
    public int getQuantity() {
        return quantity;
    }
 
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
 
}
