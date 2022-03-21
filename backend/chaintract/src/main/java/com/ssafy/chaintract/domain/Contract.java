package com.ssafy.chaintract.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter @Setter
public class Contract {
    @Id @GeneratedValue
    @Column(name = "contract_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private ContractState state;

    private String name;
    private LocalDate est_date;
    private LocalDate exp_date;
    private String file_path;


}
