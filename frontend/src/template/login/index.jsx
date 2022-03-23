import React, { useCallback, useEffect } from 'react';
import Styled from './styled';
import { Navbar } from 'components/molecules';
import KakaoLogin from 'react-kakao-login';

const LoginTemplate = () => {
  useEffect(() => {
    window.Kakao.init('06feb16c270318fcb8dda5b89a3b9f1d');
  }, []);
  const appKey = '06feb16c270318fcb8dda5b89a3b9f1d';

  return (
    <KakaoLogin
      token={appKey}
      onSuccess={(res) => {
        console.log('로그인성공');
        console.log(res);
      }}
      onFail={(err) => {
        console.log('로그인실패', err);
      }}
      onLogout={() => {
        console.log('로그아웃');
      }}
      render={({ onClick }) => (
        <div
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          카카오로 로그인하기
        </div>
      )}
    ></KakaoLogin>
  );
};

export default LoginTemplate;
