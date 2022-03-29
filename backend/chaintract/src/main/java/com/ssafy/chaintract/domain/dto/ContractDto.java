package com.ssafy.chaintract.domain.dto;

import com.ssafy.chaintract.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
public class ContractDto {
    private long id;
    private long creatorId;
    private List<Long> participantIds;
    private String name;
    private Date establishedDate;
}
