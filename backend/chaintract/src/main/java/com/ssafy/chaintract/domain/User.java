package com.ssafy.chaintract.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class User {
    @Id @GeneratedValue
    @Column(name = "user_id")
    private Long id;

    @OneToMany(mappedBy = "user")
    private List<Contract> contracts = new ArrayList<>();

    private String name;
    private String email;
    private String file_path;
    private boolean is_admin;



}
