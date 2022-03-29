package com.ssafy.chaintract.service;

import com.ssafy.chaintract.domain.Contract;
import com.ssafy.chaintract.domain.Participant;
import com.ssafy.chaintract.domain.User;
import com.ssafy.chaintract.domain.dto.ContractDto;
import com.ssafy.chaintract.domain.mapper.ContractMapper;
import com.ssafy.chaintract.repository.ContractRepository;
import com.ssafy.chaintract.repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ContractService {
    @Autowired
    ContractRepository contractRepository;

    @Autowired
    ParticipantRepository participantRepository;

    @Autowired
    ContractMapper contractMapper;

    public void createContract(ContractDto contractDto) {
        // TODO: file 처리
        List<Participant> participants = null;//contractDto.getParticipantIds().stream().filter(p -> )
        Contract contract = contractMapper.toEntity(contractDto, participants);
        Contract savedContract = contractRepository.save(contract);

        participantRepository.saveAll(participants);
    }

    public void toggleSignature(long contractId) {
//      TODO: jwt를 이용해 user 정보 받아오는 걸로
        User user = new User();
        user.setId(0L);
        Contract contract = contractRepository.findById(contractId).get();
//        List<Participant> participants = participantRepository.findAllByContract(contract);
        participantRepository.toggleSigning(contractId, user.getId());
        if(participantRepository.existsByContractAndIsSigned(contract, false) == false) {
            completeContract(contract);
        }
    }

    public void completeContract(Contract contract) {
        // TODO: 블록체인 호출
        Date date = new Date();
        contractRepository.completeContract(contract.getId(), date);
    }

    public Optional<List<Contract>> getContracts(boolean isEstablished, boolean isSigned) {
        // TODO:
        long userId = 0;
        return contractRepository.getContracts(userId, isEstablished, isSigned);
    }

    public ContractDto getContract(long contractId) {
//        Optional<Contract> contractOptional =  contractRepository.findById(contractId);
//        List<ContractDto> contractDtos = contractOptional.
        return contractMapper.toDto(contractRepository.findById(contractId).get());
    }

}
