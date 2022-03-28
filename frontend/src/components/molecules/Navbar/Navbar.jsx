import React from 'react';
import Styled from './Navbar.styled';
import { NavButton } from '@/components/atoms';
import { KakaoLoginBtn } from '@/components/molecules';

const Navbar = () => {
  if (typeof window !== 'undefined') {
    const userInfo = sessionStorage.getItem('loginInfo');
  }

  return (
    <Styled.MainContainer>
      <>
        <NavButton bgColor="inherit" color="#e0f2f1" href="/">
          ChainTract
        </NavButton>
      </>
      {userInfo ? (
        <>
          <NavButton bgColor="inherit" color="#e0f2f1" href="/contractpage">
            Contract
          </NavButton>
        </>
      ) : (
        <></>
      )}
      <>
        <NavButton bgColor="inherit" color="#e0f2f1" href="/faq">
          FAQ
        </NavButton>
      </>
      <>
        <KakaoLoginBtn />
      </>
    </Styled.MainContainer>
  );
};

export default Navbar;
