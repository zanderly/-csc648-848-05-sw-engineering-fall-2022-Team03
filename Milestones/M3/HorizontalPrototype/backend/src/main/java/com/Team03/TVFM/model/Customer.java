package com.Team03.TVFM.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id")
    private Long id;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
}
