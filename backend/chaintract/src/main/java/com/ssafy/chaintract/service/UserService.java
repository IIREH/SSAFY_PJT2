package com.ssafy.chaintract.service;

import com.ssafy.chaintract.domain.User;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
     void login(User user);
     void registerSign(User user, String path);
     void deleteUser(User user);
}
