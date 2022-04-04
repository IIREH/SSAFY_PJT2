package com.ssafy.chaintract.api;

import com.ssafy.chaintract.domain.User;
import com.ssafy.chaintract.domain.dto.ContractDto;
import com.ssafy.chaintract.repository.UserRepository;
import com.ssafy.chaintract.service.ContractService;
import io.swagger.annotations.*;
import lombok.Data;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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

    @Autowired
    UserRepository userRepository;

    // TODO: data flow에 유심하여 여러가지 상황에 따른 응답값 반환
    @ApiOperation(value = "계약증명 요청 생성", notes = "새 계약증명을 생성해 서명을 받을 수 있음", response = ApiUtils.ApiResult.class)
    @PostMapping("/contract")
    public ApiUtils.ApiResult<?> createContract(@ApiParam(value = "계약증명 정보", required = true) @RequestBody ContractDto contractDto) {
        return ApiUtils.success(contractService.createContract(contractDto));
    }

    @ApiOperation(value = "계약서 파일 업로드", notes = "서버에 계약서 파일을 업로드", response = ApiUtils.ApiResult.class)
    @PostMapping("/contract/file")
    public ApiUtils.ApiResult<?> uploadContractFile(@ApiParam(value = "계약서 파일", required = true) @RequestParam("file") MultipartFile file) throws IOException {
        return ApiUtils.success(contractService.uploadFile(file));
    }

    @ApiOperation(value = "계약서 파일 다운로드", notes = "서버에 계약서 파일을 다운로드", response = ApiUtils.ApiResult.class)
    @GetMapping(value = "/contract/{contractId}/file", produces = "application/pdf")
    public byte[] downloadContractFile(@ApiParam(value = "계약증명ID", required = true) @PathVariable long contractId) throws IOException {
        return contractService.downloadFile(contractId);
    }

    @ApiOperation(value = "계약증명 요청에 서명", notes = "로그인한 이용자가 contractId에 해당하는 증명에 서명", response = ApiUtils.ApiResult.class)
    @PutMapping("/contract/sign/{contractId}")
    public Object toggleSignature(@ApiParam(value = "계약증명ID", required = true) @PathVariable long contractId, @RequestBody CreateOutReqeust outReqeust) {
        User user =  userRepository.findUserBySocialId(outReqeust.email).get(0);
        contractService.toggleSignature(contractId, user);
        return true;
    }

    @ApiOperation(value = "내가 서명하지 않은 계약증명들을 조회", notes = "로그인한 이용자가 서명하지 않은 계약증명들을 반환", response = ApiUtils.ApiResult.class)
    @GetMapping("/contracts/ongoing/need")
    public Object findContractsNotSigned(@RequestBody CreateOutReqeust outReqeust) {
        User user =  userRepository.findUserBySocialId(outReqeust.email).get(0);
        contractService.getContracts(false, false, user);
        return true;
    }

    @ApiOperation(value = "나는 서명했지만 남이 서명하지 않은 계약증명들을 조회", notes = "로그인한 이용자가 자신은 서명했지만 남은 서명하지 않은 계약증명들을 반환", response = ApiUtils.ApiResult.class)
    @GetMapping("/contracts/ongoing")
    public Object findUnestablishedContractsSinged(@RequestBody CreateOutReqeust outReqeust) {
        User user =  userRepository.findUserBySocialId(outReqeust.email).get(0);
        contractService.getContracts(false, true, user);
        return true;
    }

    @ApiOperation(value = "성립된 증명들을 조회", notes = "모두가 서명해 성립된 계약증명들을 반환", response = ApiUtils.ApiResult.class)
    @GetMapping("/contracts/complete")
    public Object findEstablishedContracts(@RequestBody CreateOutReqeust outReqeust) {
        User user =  userRepository.findUserBySocialId(outReqeust.email).get(0);
        contractService.getContracts(true, true, user);
        return true;
    }

    @ApiOperation(value = "특정 증명을 반환", notes = "contractId로 특정되는 계약 증명을 반환", response = ApiUtils.ApiResult.class)
    @GetMapping("/contract/{contractId}")
    public ApiUtils.ApiResult<?> findContractsMySignNeeded(@ApiParam(value = "계약증명ID", required = true) @PathVariable long contractId) {
        return ApiUtils.success(contractService.getContract(contractId));
    }

    @Data
    static class CreateOutReqeust{
        private String email;
    }
}
