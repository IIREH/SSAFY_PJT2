package com.ssafy.chaintract.smartcontract;

import java.io.IOException;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Component;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.protocol.admin.Admin;
import org.web3j.protocol.admin.methods.response.PersonalUnlockAccount;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthCall;
import org.web3j.protocol.core.methods.response.EthGetTransactionCount;
import org.web3j.protocol.core.methods.response.EthGetTransactionReceipt;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;

/**
 * 본 코드는 FundRaising 예제를 통해 call, transaction, receipt 을 활용해
 * 스마트 컨트랙트를 호출하는 실습으로, 후에 스마트 컨트랙트가 배포되면 본 코드를
 * 바탕으로 재작성할 것임.
 *
 * 참고:
 * https://sabarada.tistory.com/21
 * http://docs.web3j.io/4.8.7/transactions/transactions_and_smart_contracts/
 */

@Component
public class SmartContractService {

    private String beneficiary = "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1";
    private String from = "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0";

    private String contract = "0xcfeb869f69431e42cdb54a4f4f105c19c080a601";

    // hardcording because of testing
    private String beneficiary_pwd = "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d";
    private String from_pwd = "0x6cbed15c793ce57650b9877cf6fa156fbef513c4e6134f022a85b1ffdd59b2a1";

    private Admin web3j = null;

    public SmartContractService()
    {
        web3j = Admin.build(new HttpService()); // default server : http://localhost:8545
    }

    public String ethCall(Function function) throws IOException {
        // 1. Account Lock 해제
        PersonalUnlockAccount personalUnlockAccount = web3j.personalUnlockAccount(from, from_pwd).send();

        if (personalUnlockAccount.accountUnlocked()) { // unlock 일때

            //2. transaction 제작
            Transaction transaction = Transaction.createEthCallTransaction(from, contract,
                    FunctionEncoder.encode(function));

            //3. ethereum 호출후 결과 가져오기
            EthCall ethCall = web3j.ethCall(transaction, DefaultBlockParameterName.LATEST).send();

            //4. 결과값 decode
            List<Type> decode = FunctionReturnDecoder.decode(ethCall.getResult(),
                    function.getOutputParameters());

            System.out.println("ethCall.getResult() = " + ethCall.getResult());
            System.out.println("getValue = " + decode.get(0).getValue());
            System.out.println("getType = " + decode.get(0).getTypeAsString());

            return decode.get(0).getValue().toString();
        } else {
            throw new PersonalLockException("check ethereum personal Lock");
        }
    }

    public String ethSendTransaction(Function function, long value) throws IOException, InterruptedException, ExecutionException {

        // 1. Account Lock 해제
        PersonalUnlockAccount personalUnlockAccount = web3j.personalUnlockAccount(from, from_pwd).send();

        if (personalUnlockAccount.accountUnlocked()) { // unlock 일때

            //2. account에 대한 nonce값 가져오기.
            EthGetTransactionCount ethGetTransactionCount = web3j.ethGetTransactionCount(
                    from, DefaultBlockParameterName.LATEST).sendAsync().get();

            BigInteger nonce = ethGetTransactionCount.getTransactionCount();

            //3. Transaction값 제작
            Transaction transaction = Transaction.createFunctionCallTransaction(from, nonce,
                    Transaction.DEFAULT_GAS,
                    null, contract, new BigInteger(String.valueOf(value)),
                    FunctionEncoder.encode(function));

            // 4. ethereum Call &
            EthSendTransaction ethSendTransaction = web3j.ethSendTransaction(transaction).send();

            // transaction에 대한 transaction Hash값 얻기.
            String transactionHash = ethSendTransaction.getTransactionHash();

            if(ethSendTransaction.hasError()) {
                throw new EthLackException(ethSendTransaction.getError().getMessage());
            }
            // ledger에 쓰여지기 까지 기다리기.
            Thread.sleep(5000);

            return transactionHash;
        } else {
            throw new PersonalLockException("check ethereum personal Lock");
        }
    }

    public TransactionReceipt getReceipt(String transactionHash) throws IOException {

        EthGetTransactionReceipt transactionReceipt = web3j.ethGetTransactionReceipt(transactionHash).send();

        if(transactionReceipt.getTransactionReceipt().isPresent()) {
            System.out.println("transactionReceipt.getResult().getContractAddress() = " +
                    transactionReceipt.getResult());
        } else {
            System.out.println("transaction complete not yet");
        }

        return transactionReceipt.getResult();
    }

    public String currentCollection() throws IOException, ExecutionException, InterruptedException {

        // 1. 호출하고자 하는 function 세팅[functionName, parameters]
        Function function = new Function("currentCollection",
                Collections.emptyList(),
                Arrays.asList(new TypeReference<Uint256>() {}));

        // 2. ethereum을 function 변수로 통해 호출
        return this.ethCall(function);
    }

    public String beneficiary() throws IOException, ExecutionException, InterruptedException {

        // 1. 호출하고자 하는 function 세팅[functionName, parameters]
        Function function = new Function("beneficiary",
                Collections.emptyList(),
                Arrays.asList(new TypeReference<Address>() {}));

        // 2. ethereum을 function 변수로 통해 호출
        return this.ethCall(function);
    }

    public void setTestSum(Uint256 test) throws IOException, ExecutionException, InterruptedException {
        // 1. 호출하고자 하는 function 세팅[functionName, parameters]
        Function function = new Function("setTestSum",
                Arrays.asList(test),
                Collections.emptyList());

        // 2. sendTransaction
        String txHash = this.ethSendTransaction(function, 0L);

        // 7. getReceipt
        TransactionReceipt receipt = this.getReceipt(txHash);
        System.out.println("receipt = " + receipt);
    }

    public void fund() throws IOException, ExecutionException, InterruptedException {
        // 1. 호출하고자 하는 function 세팅[functionName, parameters]
        Function function = new Function("fund",
                Collections.emptyList(),
                Collections.emptyList());

        // 2. sendTransaction
        String txHash = this.ethSendTransaction(function, 1000000000000000000L);

        // 7. getReceipt
        TransactionReceipt receipt = this.getReceipt(txHash);
        System.out.println("receipt = " + receipt);
    }

    private class PersonalLockException extends RuntimeException {
        public PersonalLockException(String msg) {
            super(msg);
        }
    }

    private class EthLackException extends RuntimeException {
        public EthLackException(String msg) {
            super(msg);
        }
    }

}