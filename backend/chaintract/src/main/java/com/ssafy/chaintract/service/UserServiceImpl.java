package com.ssafy.chaintract.service;

import com.ssafy.chaintract.domain.User;
import com.ssafy.chaintract.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    @Transactional
    public void login(User user) {

        // 기존 USER 유무 확인 후 없으면 저장
        List<User> userList = userRepository.findUserBySocialId(user.getSocialId());
        if(userList.size() == 0){
            userRepository.save(user);
        }
    }

    @Override
    public boolean registerSign() {

        return false;
    }


    @Override
    @Transactional
    public void deleteUser(User user) {
        List<User> userList = userRepository.findUserBySocialId(user.getSocialId());
        userRepository.deleteUser(userList.get(0));
    }

}
