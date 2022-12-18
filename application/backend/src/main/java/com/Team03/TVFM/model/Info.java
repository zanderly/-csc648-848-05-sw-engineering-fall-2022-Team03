package com.Team03.TVFM.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Info
{
    @Id
    @Column(name = "info_id")
    private long id;

    @Column(name = "")
    private String email;

    @Column(name = "phone_num")
    private String phoneNum;

    @Column(name = "CustomerAccount_id")
    private int customerId;

    @Column(name = "VendorAccount_id")
    private int vendorId;
}
