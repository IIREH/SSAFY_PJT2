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

@Slf4j
@Api(tags = {"api"})
@RestController
@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final KakaoService kakaoService;
    private final FileStore fileStore;
    private static final String LOGIN_USER = "loginUser";

    @ApiOperation("로그인")
    @PostMapping("/auth/login")
    public void loginUser(@ModelAttribute CreateUserRequest userRequest, HttpServletRequest request){

        User user = kakaoService.getUserInfoByToken(userRequest.access_token);
        /**
         * AcessToken이 유효한 값이 아닐때 예외 처리 발생
         * */
        userService.login(user);

        log.info("접근 토큰 : "+userRequest.getAccess_token());
        log.info("로그인한 유저 이름 : " + user.getName());

        HttpSession session = request.getSession();
        session.setAttribute(LOGIN_USER, user);
    }

    @ApiOperation("로그아웃")
    @GetMapping("/auth/logout")
    public void logoutUser(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        User user = (User)session.getAttribute(LOGIN_USER);
        log.info("로그아웃한 유저 이름 : " + user.getName());
        if(session != null) session.invalidate();
    }

    @ApiOperation("회원탈퇴")
    @DeleteMapping("/user/delete")
    public void deleteUser(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        User user = (User)session.getAttribute(LOGIN_USER);

        userService.deleteUser(user);
        session.invalidate();
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
    public class CreateUserRequest {
        private String access_token;
    }

    @Data
    public class CreateSignRequest{
        private MultipartFile file;
    }

}