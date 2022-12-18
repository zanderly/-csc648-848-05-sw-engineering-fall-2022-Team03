package com.Team03.TVFM.model;


import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id")
    private Long id;
    @Column(name = "password")
    private String password;
    @Column(name = "email")
    private String email;

}
