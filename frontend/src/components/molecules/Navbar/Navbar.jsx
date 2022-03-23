import React from 'react';
import Styled from './Navbar.styled';
import { useRecoilState } from 'recoil';
import { NavButton } from '@/components/atoms';
import { userState } from '@/states/user';
import { KakaoLoginBtn } from '@/components/molecules';

const Navbar = () => {
  const [user, setUser] = useRecoilState(userState);
  return (
    <Styled.MainContainer>
      <>
        <NavButton bgColor="inherit" color="#e0f2f1" href="/">
          ChainTract
        </NavButton>
      </>
      {user.id ? (
        <>
          <NavButton bgColor="inherit" color="#e0f2f1" href="/contractpage">
            Contract
          </NavButton>
          <NavButton bgColor="inherit" color="#e0f2f1" href="/faq">
            FAQ
          </NavButton>
          <NavButton bgColor="inherit" color="#e0f2f1" href={`/user/${user.id}`}>
            MyPage
          </NavButton>
          <KakaoLoginBtn />
        </>
      ) : (
        <>
          <NavButton bgColor="inherit" color="#e0f2f1" href="/faq">
            FAQ
          </NavButton>
          <KakaoLoginBtn />
        </>
      )}
    </Styled.MainContainer>
  );
};

export default Navbar;
