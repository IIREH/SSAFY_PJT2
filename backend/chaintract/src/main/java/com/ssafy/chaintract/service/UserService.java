package com.ssafy.chaintract.service;

import com.ssafy.chaintract.domain.User;

public interface UserService {
     void login(User user);
     boolean registerSign();
     void deleteUser(User user);
}
