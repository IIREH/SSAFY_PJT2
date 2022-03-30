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

    @Autowired
    UserRepository userRepository;

    public ContractDto toDto(Contract contract) {
        return ContractDto.builder()
                .id(contract.getId())
                .creatorId(contract.getUser().getId())
                .participantIds(participantRepository.findAllByContract(contract).stream().map(p -> p.getUser().getId()).collect(Collectors.toList()))
                .name(contract.getName())
                .establishedDate(contract.getEst_date())
//                .file()
                .build();
    }

    public Contract toEntity(ContractDto contractDto) {
        return Contract.builder()
                .id(contractDto.getId())
                .user(userRepository.findOne(contractDto.getCreatorId()))
                .isEstablished(contractDto.getEstablishedDate() != null)
                .name(contractDto.getName())
                .est_date(contractDto.getEstablishedDate())
//                .file_path()
                .build();
    }
}
