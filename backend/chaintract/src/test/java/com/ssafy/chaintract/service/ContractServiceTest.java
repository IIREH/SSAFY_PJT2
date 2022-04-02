package com.ssafy.chaintract.service;

import com.ssafy.chaintract.domain.Contract;
import com.ssafy.chaintract.domain.Participant;
import com.ssafy.chaintract.domain.User;
import com.ssafy.chaintract.domain.dto.ContractDto;
import com.ssafy.chaintract.domain.mapper.ContractMapper;
import com.ssafy.chaintract.repository.ContractRepository;
import com.ssafy.chaintract.repository.ParticipantRepository;
import com.ssafy.chaintract.repository.UserRepository;
import com.ssafy.chaintract.smartcontract.SmartContractService;
import org.junit.After;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpRequest;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

//@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest
@Service
public class ContractServiceTest {
    @Autowired
    SmartContractService smartContractService;

    @Autowired
    ContractService contractService;

    @Autowired
    UserService userService;

    @Autowired
    ContractRepository contractRepository;

    @Autowired
    ParticipantRepository participantRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ContractMapper contractMapper;

//    User creator;
//    User participant1;
//    User participant2;
//    User participant3;
//
//    List<Participant> participants = new ArrayList<>();
//
//    ContractDto contractDto1;
//    ContractDto contractDto2;
//    Contract contract1;
//    Contract contract2;

    @Test
    @Transactional
    public void testAll() throws IOException, ExecutionException, InterruptedException {
        User creator;
        User participant1;
        User participant2;
        User participant3;

        ContractDto contractDto1;
        ContractDto contractDto2;
        Contract contract1;
        Contract contract2;

        creator = new User();
        creator.setSocialId("0L");
        participant1 = new User();
        participant1.setSocialId("1L");
        participant2 = new User();
        participant2.setSocialId("2L");
        participant3 = new User();
        participant3.setSocialId("3L");

        userRepository.save(creator);
        userRepository.save(participant1);
        userRepository.save(participant2);
        userRepository.save(participant3);

        List<Long> participantIds = Arrays.asList(creator.getId(), participant1.getId(), participant2.getId(), participant3.getId());
        contractDto1 = ContractDto.builder()
                .creatorId(creator.getId())
                .participantIds(participantIds)
                .name("test Contract1")
                .build();
        contractDto2 = ContractDto.builder()
                .creatorId(creator.getId())
                .participantIds(participantIds)
                .name("test Contract2")
                .build();

        contract1 = contractService.createContract(contractDto1);
//        contract2 = contractService.createContract(contractDto2);
        Contract contractFound = contractRepository.findById(contract1.getId()).get();
        Assertions.assertSame(contract1, contractFound);

        List<Long> participantIdsFound = participantRepository.findAllByContract(contractFound).stream().map(p -> p.getUser().getId()).collect(Collectors.toList());
        Assertions.assertIterableEquals(participantIds, participantIdsFound);


        MockHttpSession mockSession = new MockHttpSession();
        MockHttpServletRequest mockRequest = new MockHttpServletRequest();
        mockRequest.setSession(mockSession);
        HttpSession session = mockRequest.getSession();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(mockRequest));
        session.setAttribute("loginUser", creator);

        userService.login(creator);
        contractService.toggleSignature(contract1.getId(), creator);
        Assertions.assertSame(false, contractRepository.getById(contract1.getId()).isEstablished());
        Assertions.assertSame(true, participantRepository.findAllByUser(creator).get(0).isSigned());
        contractService.toggleSignature(contract1.getId(), creator);
        Assertions.assertSame(false, participantRepository.findAllByUser(creator).get(0).isSigned());
        Assertions.assertSame(false, participantRepository.findAllByUser(participant1).get(0).isSigned());
        contractService.toggleSignature(contract1.getId(), creator);
        session.setAttribute("loginUser", participant1);
        contractService.toggleSignature(contract1.getId(), participant1);
        session.setAttribute("loginUser", participant2);
        contractService.toggleSignature(contract1.getId(), participant2);
        session.setAttribute("loginUser", participant3);
        contractService.toggleSignature(contract1.getId(), participant3);
        Assertions.assertSame(true, contractRepository.getById(contract1.getId()).isEstablished());

        byte[] encrypted = new byte[32];
        for(int i = 0; i < 32; ++i) {
            encrypted[i] = 'f';
        }
        long rand = new Random().nextLong();
        if(rand < 0) {
            rand *= -1;
        }
        smartContractService.uploadContract(rand, encrypted);
        byte[] encryptedFound = smartContractService.verify(rand);
        Assertions.assertArrayEquals(encrypted, encryptedFound);
    }
}
