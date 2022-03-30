package com.ssafy.chaintract.api;

import com.ssafy.chaintract.domain.dto.ContractDto;
import com.ssafy.chaintract.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class ContractController {
    @Autowired
    ContractService contractService;

    @PostMapping("/contract")
    public Object createContract(@RequestBody ContractDto contractDto) {
        contractService.createContract(contractDto);
        return true;
    }

    @PutMapping("/contract/sign/{contractId}")
    public Object toggleSignature(@PathVariable long contractId) {
        contractService.toggleSignature(contractId);
        return true;
    }

    @GetMapping("/contracts/ongoing/need")
    public Object findContractsNotSigned() {
        contractService.getContracts(false, false);
        return true;
    }

    @GetMapping("/contracts/ongoing")
    public Object findUnestablishedContractsSinged() {
        contractService.getContracts(false, true);
        return true;
    }

    @GetMapping("/contracts/complete")
    public Object findEstablishedContracts() {
        contractService.getContracts(true, true);
        return true;
    }

    @GetMapping("/contract/{contractId}")
    public Object findContractsMySignNeeded(@PathVariable long contractId) {
        contractService.getContract(contractId);
        return true;
    }
}
