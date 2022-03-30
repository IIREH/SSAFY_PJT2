import React from 'react';
import Styled from './KakaoLoginBtn.styled';
import KakaoLogin from 'react-kakao-login';
import router from 'next/router';
import { useQuery, useMutation } from 'react-query';
import { authInstance } from '@/libs/axios';
import { KAKAO_OAUTH_APIKEY } from '@/config';

const KakaoLoginBtn = () => {
  const api = authInstance();
  const mutation = useMutation((token) => api.post('/auth/login', { accessToken: token }));

  let userInfo = '';
  if (typeof window !== 'undefined' && window.sessionStorage) {
    userInfo = sessionStorage.getItem('chainTractLoginInfo');
  }

  const logout = () => {
    api.get('/auth/logout');
  };

  return (
    <KakaoLogin
      token={KAKAO_OAUTH_APIKEY}
      onLogout={() => {
        sessionStorage.removeItem('chainTractLoginInfo');
        logout();
        router.push('/');
      }}
      onSuccess={(res) => {
        console.log(res);
        sessionStorage.setItem('chainTractLoginInfo', {
          id: res.profile.kakao_account.email,
          name: res.profile.kakao_account.profile.nickname,
        });
        mutation.mutate(res.response.access_token);
        router.push('/');
      }}
      onFail={() => {}}
      render={({ onClick }) => (
        <Styled.MainContainer
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          {userInfo ? <>로그아웃</> : <>로그인</>}
        </Styled.MainContainer>
      )}
    />
  );
};

export default KakaoLoginBtn;
