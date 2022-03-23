import React, { useCallback, useEffect, useState } from 'react';
import Styled from './styled';
import KakaoLogin from 'react-kakao-login';
import { useRecoilState } from 'recoil';
import { userState } from '@/states/user';
import router from 'next/router';

const KakaoLoginBtn = () => {
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {}, [user]);

  // env처리 해야함
  const appKey = '06feb16c270318fcb8dda5b89a3b9f1d';
  return (
    <KakaoLogin
      token={appKey}
      onLogout={() => {
        setUser({
          id: '',
          name: '',
        });
        router.push('/');
      }}
      onSuccess={(res) => {
        setUser({
          id: res.profile.kakao_account.email,
          name: res.profile.kakao_account.profile.nickname,
        });
        router.replace(router.asPath);
      }}
      onFail={() => {
        alert('다시 로그인 해주세요');
      }}
      render={({ onClick }) => (
        <div
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          {user.id ? <>로그아웃</> : <>로그인</>}
          {user.name}
          {user.id}
        </div>
      )}
    />
  );
};

export default KakaoLoginBtn;
