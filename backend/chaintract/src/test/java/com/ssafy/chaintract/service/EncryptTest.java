package com.ssafy.chaintract.service;

import com.ssafy.chaintract.file.Encryption;
import org.bouncycastle.util.encoders.Base64;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
@SpringBootTest
public class EncryptTest {
//    @Autowired
//    Encryption encryption;
//
//    final String path = "C:\\imageUpload\\b436d45f-3505-47cd-9a94-28a59500357a.pdf";
//
//    @Test
//    public void EncEqualsDecTest() throws Exception {
//        byte[] plain = Encryption.getBytes(new File(path));
//
//        String enc = Encryption.encrypt(plain);
//        byte[] dec = Encryption.decrypt(enc);
//
//        String plainBase64 = Base64.toBase64String(plain);
//        Assertions.assertSame(plain, dec);
//    }
}
