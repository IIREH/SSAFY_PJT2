package com.ssafy.chaintract.service;

import com.ssafy.chaintract.domain.Contract;
import com.ssafy.chaintract.domain.Participant;
import com.ssafy.chaintract.domain.User;
import com.ssafy.chaintract.domain.dto.ContractDto;
import com.ssafy.chaintract.domain.mapper.ContractMapper;
import com.ssafy.chaintract.file.FileStore;
import com.ssafy.chaintract.file.UploadFile;
import com.ssafy.chaintract.repository.ContractRepository;
import com.ssafy.chaintract.repository.ParticipantRepository;
import com.ssafy.chaintract.repository.UserRepository;
import com.ssafy.chaintract.smartcontract.SmartContractService;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.client.support.HttpRequestWrapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ContractService {
    @Autowired
    HttpServletRequest request;

    @Autowired
    SmartContractService smartContractService;

    @Autowired
    ContractRepository contractRepository;

    @Autowired
    ParticipantRepository participantRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ContractMapper contractMapper;

    @Autowired
    FileStore fileStore;

    @Transactional
    public ContractDto createContract(ContractDto contractDto, String creatorEmail) {
        Contract contract = contractRepository.save(contractMapper.toEntity(contractDto));

        List<Participant> participants = new ArrayList<>();
        for(String email : contractDto.getParticipantEmails()) {
            User user = userRepository.findUserByEmail(email).get(0);
            Participant participant = Participant.builder()
                    .contract(contract)
                    .user(user)
                    .isSigned(user.getEmail().equals(creatorEmail))
                    .build();
            participants.add(participant);
        }
        participantRepository.saveAll(participants);

        return contractMapper.toDto(contract);
    }

    public String uploadFile(MultipartFile file) throws IOException {
        UploadFile uploadFile = fileStore.storeFile(file);
        log.info("full path: {}", uploadFile.getFullPath());
        return uploadFile.getFullPath();
    }

    @Transactional
    public byte[] downloadFile(long contractId) throws IOException {
        String fullPath = contractRepository.findById(contractId).get().getFilePath();
        return fileStore.retrieveFile(fullPath);
    }

    @Transactional
    public void toggleSignature(long contractId, User user) {
        Contract contract = contractRepository.findById(contractId).get();
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

    public List<ContractDto> getContracts(boolean isEstablished, boolean isSigned, User user) {
        Optional<List<Contract>> optionalContracts = null;

        if(isEstablished) {
            optionalContracts = contractRepository.getEstablishedContracts(user.getId());
        } else if(isSigned == false) {
            optionalContracts = contractRepository.getContractsINotSigned(user.getId());
        } else {
            optionalContracts = contractRepository.getContractsOthersNotSigned(user.getId());
        }

//        if(optionalContracts.isPresent()) {
//            return
//        }
//        contracts
//                .ifPresent(list -> list.stream().map(x -> contractMapper.toDto(x)).collect(Collectors.toList()));

        return optionalContracts.get().stream().map(x -> contractMapper.toDto(x)).collect(Collectors.toList());
    }

    public ContractDto getContract(long contractId) {
//        Optional<Contract> contractOptional =  contractRepository.findById(contractId);
//        List<ContractDto> contractDtos = contractOptional.
        return contractMapper.toDto(contractRepository.findById(contractId).get());
    }

}
