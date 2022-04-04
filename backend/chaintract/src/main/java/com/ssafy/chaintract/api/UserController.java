package com.ssafy.chaintract.api;

import com.ssafy.chaintract.domain.User;
import com.ssafy.chaintract.file.FileStore;
import com.ssafy.chaintract.file.UploadFile;
import com.ssafy.chaintract.service.KakaoService;
import com.ssafy.chaintract.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.security.Principal;
import java.util.Enumeration;
import java.util.Iterator;

@Slf4j
@Api(tags = {"api"}) // 알아보자
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final KakaoService kakaoService;
    private final FileStore fileStore;
    private static final String LOGIN_USER = "loginUser";

    @ApiOperation("로그인")
    @PostMapping("/auth/login")
    public void loginUser(@RequestBody CreateUserRequest userRequest, HttpServletRequest request){

        log.info("로그인 요청");
        User user = kakaoService.getUserInfoByToken(userRequest.getAccesstoken());
        /**
         * AcessToken이 유효한 값이 아닐때 예외 처리 발생
         * */
        userService.login(user);

        log.info("접근 토큰 : "+userRequest.getAccesstoken());
        log.info("로그인한 유저 이름 : " + user.getName());

        HttpSession session = request.getSession();
        session.setAttribute(LOGIN_USER, user);

        User findUser = (User)session.getAttribute(LOGIN_USER);
        log.info("세션에 저장 : "+ findUser.getName());
    }

    @ApiOperation("로그아웃")
    @GetMapping("/auth/logout")
    public void logoutUser(HttpServletRequest request){

        request.getSession().invalidate();
    }


    @ApiOperation("회원탈퇴")
    @DeleteMapping("/user/delete")
    public void deleteUser(@RequestBody CreateOutReqeust outReqeust, HttpServletRequest request){

        String email = outReqeust.getEmail();
        userService.deleteUser(email);

        request.getSession().invalidate();
    }

    @ApiOperation("서명 업로드")
    @PostMapping("/user/signature")
    public void uploadSign(@ModelAttribute CreateSignRequest signRequest, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        User user = (User)session.getAttribute(LOGIN_USER);

        UploadFile uploadFile = null;
        try {
            uploadFile = fileStore.storeFile(signRequest.file);
        } catch (IOException e) {
            e.printStackTrace();
        }

        log.info("사인 등록 유저 이름 :" + user.getName());
        userService.registerSign(user, uploadFile.getFullPath());
    }

    /**
     * 나중에 지울것
     * 포스트맨으로 테스트 : 성공
     * */
    @PostMapping("/test")
    public void upload(@ModelAttribute CreateSignRequest signRequest){
        try {
            fileStore.storeFile(signRequest.file);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Data
    static class CreateUserRequest {
        private String accesstoken;
    }

    @Data
    static class CreateOutReqeust{
        private String email;
    }


    @Data
    static class CreateSignRequest{
        private MultipartFile file;
    }

}