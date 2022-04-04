package com.ssafy.chaintract.domain.mapper;

import com.ssafy.chaintract.domain.Contract;
import com.ssafy.chaintract.domain.Participant;
import com.ssafy.chaintract.domain.dto.ContractDto;
import com.ssafy.chaintract.repository.ParticipantRepository;
import com.ssafy.chaintract.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ContractMapper {
    @Autowired
    ParticipantRepository participantRepository;

    public ContractDto toDto(Contract contract) {
        return ContractDto.builder()
                .id(contract.getId())
                .participantEmails(participantRepository.findAllByContract(contract).stream().map(p -> p.getUser().getEmail()).collect(Collectors.toList()))
                .name(contract.getName())
                .createdDate(contract.getCreatedDate())
                .establishedDate(contract.getEstDate())
                .filePath(contract.getFilePath())
                .build();
    }

    public Contract toEntity(ContractDto contractDto) {
        return Contract.builder()
                .id(contractDto.getId())
                .name(contractDto.getName())
                .createdDate(contractDto.getCreatedDate())
                .estDate(contractDto.getEstablishedDate())
                .filePath(contractDto.getFilePath())
                .build();
    }
}
