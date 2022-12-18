package com.Team03.TVFM.model;

import java.util.ArrayList;
import java.util.List;

//class to get the items from the cart
public class Orderinfo {

    private List<CartInfo> cart = new ArrayList<CartInfo>();

    public void setCartLines(List<CartInfo> temp){
        this.cart = temp;
    }

    public List<CartInfo> getCartLines() {
        return cart;
    }
}
