package com.Team03.TVFM.model;

import com.fasterxml.jackson.annotation.JsonRawValue;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.fasterxml.jackson.databind.util.JSONWrappedObject;
import com.mysql.cj.xdevapi.JsonArray;
import lombok.Data;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Data
@Entity
public class Cart implements Serializable
{


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    private Customer customer;

    @OneToOne(fetch = FetchType.LAZY)
    private Vendor vendor;

    @Column(name = "itemsIDs")
    private String itemIDs;

    @Override
    public String toString() {
        return itemIDs;
    }



//    @Override
//    public String toString() {
//
//        int count = 0;
//        List<String> items = Arrays.asList(itemIDs.split("\\s*,\\s*"));
//        StringBuilder cartItems = new StringBuilder();
//        if(!items.isEmpty()) {
//            if(!items.isEmpty()) {
//                for(String itemid : items) {
//                    Items item = itemsRepo.findItemInfo(Long.parseLong(itemid));
//                    if(count == 0) {
//                        count++;
//                        cartItems.append("{\"id\":\"").append(item.getId()).append("\",")
//                                .append("\"description\":\"").append(item.getDescription()).append("\",")
//                                .append("\"name\":\"").append(item.getName()).append("\",")
//                                .append("\"nutrition\":\"").append(item.getNutrition()).append("\",")
//                                .append("\"price\":\"").append(item.getPrice()).append("\",")
//                                .append("\"quantity\":\"").append(item.getQuantity()).append("\",")
//                                .append("\"vendor\":\"").append(item.getVendor()).append("\"}");
//                    } else {
//                        cartItems.append(",{\"id\":\"").append(item.getId()).append("\",")
//                                .append("\"description\":\"").append(item.getDescription()).append("\",")
//                                .append("\"name\":\"").append(item.getName()).append("\",")
//                                .append("\"nutrition\":\"").append(item.getNutrition()).append("\",")
//                                .append("\"price\":\"").append(item.getPrice()).append("\",")
//                                .append("\"quantity\":\"").append(item.getQuantity()).append("\",")
//                                .append("\"vendor\":\"").append(item.getVendor()).append("\"}");
//                    }
//                }
//
//            }
//        }
//        else cartItems = new StringBuilder("{}");
//        return cartItems.toString();
//    }

//    private List<Items> itemIDsList;
}
