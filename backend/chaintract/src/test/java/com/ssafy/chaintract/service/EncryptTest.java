package com.ssafy.chaintract.service;

import com.ssafy.chaintract.file.Encryption;
import com.ssafy.chaintract.smartcontract.SmartContractService;
import org.bouncycastle.util.encoders.Base64;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.util.Random;

@SpringBootTest
public class EncryptTest {
//    @Autowired
//    Encryption encryption;

    @Autowired
    SmartContractService smartContractService;

    final String path = "C:\\imageUpload\\4d137ae5-54fa-4396-9eba-e2a0d9c85911.json";

    @Test
    public void EncEqualsDecTest() throws Exception {
        byte[] plain = Encryption.getBytes(new File(path));

//        String enc = Encryption.encrypt(plain);
        byte[] enc = Encryption.encrypt(plain);
        byte[] dec = Encryption.decrypt(enc);

//        String plainBase64 = Base64.toBase64String(plain);
        Assertions.assertArrayEquals(plain, dec);

        long rand = new Random().nextLong();
        if(rand < 0) {
            rand *= -1;
        }
        smartContractService.uploadContract(rand, enc);
        byte[] encFound = smartContractService.verify(rand);
        Assertions.assertSame(enc, encFound);
    }
}
