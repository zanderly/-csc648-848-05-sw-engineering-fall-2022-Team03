package com.Team03.TVFM.model;

import java.util.List;

//class to show previous purchases
public class ReturnPurchases {

    private List<Purchases> order;
    private List<OrderDetails> orderDetails;
 
    public List<Purchases> getOrdersInfo() {
        return order;
    }
 
    public void setOrdersInfo(List<Purchases> order) {
        this.order = order;
    }
 
    public List<OrderDetails> getOrderDetails() {
        return orderDetails;
    }
 
    public void setOrderDetails(List<OrderDetails> orderDetails) {
        this.orderDetails = orderDetails;
    }
 
}