package com.ssafy.chaintract.domain;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity(name = "contract")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Contract {
    @Id @GeneratedValue
    @Column(name = "contract_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

//    @Enumerated(EnumType.STRING)
//    private ContractState state;
    private boolean isEstablished;

    private String name;
    private Date est_date;
    private Date exp_date;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id")
    private File file;


}
