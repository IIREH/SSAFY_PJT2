package com.ssafy.chaintract.service;

import com.ssafy.chaintract.domain.Contract;
import com.ssafy.chaintract.domain.Participant;
import com.ssafy.chaintract.domain.User;
import com.ssafy.chaintract.domain.dto.ContractDto;
import com.ssafy.chaintract.domain.mapper.ContractMapper;
import com.ssafy.chaintract.repository.ContractRepository;
import com.ssafy.chaintract.repository.ParticipantRepository;
import com.ssafy.chaintract.repository.UserRepository;
import org.apache.http.HttpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.client.support.HttpRequestWrapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ContractService {
    @Autowired
    HttpServletRequest request;

    @Autowired
    ContractRepository contractRepository;

    @Autowired
    ParticipantRepository participantRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ContractMapper contractMapper;

    @Transactional
    public Contract createContract(ContractDto contractDto) {
        // TODO: file 처리
        Contract contract = contractRepository.save(contractMapper.toEntity(contractDto));

        List<Participant> participants = new ArrayList<>();
        for(long id : contractDto.getParticipantIds()) {
            User user = userRepository.findOne(id);
            Participant participant = Participant.builder()
                    .contract(contract)
                    .user(user)
                    .isSigned(false)
                    .build();
            participants.add(participant);
        }
        participantRepository.saveAll(participants);

        return contract;
    }

    @Transactional
    public void toggleSignature(long contractId) {
        Contract contract = contractRepository.findById(contractId).get();
        User user = (User)request.getSession().getAttribute("loginUser");
//        List<Participant> participants = participantRepository.findAllByContract(contract);
        participantRepository.toggleSigning(contractId, user.getId());
        if(participantRepository.existsByContractAndIsSigned(contract, false) == false) {
            completeContract(contract);
        }
    }

    @Transactional
    public void completeContract(Contract contract) {
        // TODO: 블록체인 호출
        Date date = new Date();
        contractRepository.completeContract(contract.getId(), date);
    }

    public Optional<List<Contract>> getContracts(boolean isEstablished, boolean isSigned) {
        User user = (User)request.getSession().getAttribute("loginUser");
        return contractRepository.getContracts(user.getId(), isEstablished, isSigned);
    }

    public ContractDto getContract(long contractId) {
//        Optional<Contract> contractOptional =  contractRepository.findById(contractId);
//        List<ContractDto> contractDtos = contractOptional.
        return contractMapper.toDto(contractRepository.findById(contractId).get());
    }

}
