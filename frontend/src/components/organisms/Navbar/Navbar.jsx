import React from 'react';
import Styled from './Navbar.styled';
import { NavButton } from '@/components/atoms';
import { KakaoLoginBtn } from '@/components/molecules';

const Navbar = () => {
  let userInfo = '';
  if (typeof window !== 'undefined' && window.sessionStorage) {
    userInfo = sessionStorage.getItem('chainTractLoginInfo');
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
