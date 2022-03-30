package com.ssafy.chaintract.api;

import com.ssafy.chaintract.domain.dto.ContractDto;
import com.ssafy.chaintract.service.ContractService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@ApiResponses(value = { @ApiResponse(code = 401, message = "Unauthorized", response = BasicResponse.class),
        @ApiResponse(code = 403, message = "Forbidden", response = BasicResponse.class),
        @ApiResponse(code = 404, message = "Not Found", response = BasicResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = BasicResponse.class) })

@Api("contract 관련 API")
@RestController
@RequestMapping
public class ContractController {
    @Autowired
    ContractService contractService;

    @ApiOperation(value = "계약증명 요청 생성", notes = "새 계약증명을 생성해 서명을 받을 수 있음", response = ApiUtils.ApiResult.class)
    @PostMapping("/contract")
    public Object createContract(@ApiParam(value = "계약증명 정보", required = true) @RequestBody ContractDto contractDto) {
        contractService.createContract(contractDto);
        return true;
    }

    @ApiOperation(value = "계약증명 요청에 서명", notes = "로그인한 이용자가 contractId에 해당하는 증명에 서명", response = ApiUtils.ApiResult.class)
    @PutMapping("/contract/sign/{contractId}")
    public Object toggleSignature(@ApiParam(value = "계약증명ID", required = true) @PathVariable long contractId) {
        contractService.toggleSignature(contractId);
        return true;
    }

    @ApiOperation(value = "내가 서명하지 않은 계약증명들을 조회", notes = "로그인한 이용자가 서명하지 않은 계약증명들을 반환", response = ApiUtils.ApiResult.class)
    @GetMapping("/contracts/ongoing/need")
    public Object findContractsNotSigned() {
        contractService.getContracts(false, false);
        return true;
    }

    @ApiOperation(value = "나는 서명했지만 남이 서명하지 않은 계약증명들을 조회", notes = "로그인한 이용자가 자신은 서명했지만 남은 서명하지 않은 계약증명들을 반환", response = ApiUtils.ApiResult.class)
    @GetMapping("/contracts/ongoing")
    public Object findUnestablishedContractsSinged() {
        contractService.getContracts(false, true);
        return true;
    }

    @ApiOperation(value = "성립된 증명들을 조회", notes = "모두가 서명해 성립된 계약증명들을 반환", response = ApiUtils.ApiResult.class)
    @GetMapping("/contracts/complete")
    public Object findEstablishedContracts() {
        contractService.getContracts(true, true);
        return true;
    }

    @ApiOperation(value = "특정 증명을 반환", notes = "contractId로 특정되는 계약 증명을 반환", response = ApiUtils.ApiResult.class)
    @GetMapping("/contract/{contractId}")
    public Object findContractsMySignNeeded(@ApiParam(value = "계약증명ID", required = true) @PathVariable long contractId) {
        contractService.getContract(contractId);
        return true;
    }
}
