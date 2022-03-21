import React from 'react';
import Styled from './Navbar.styled';
import { useRecoilValue, useRecoilState } from 'recoil';
import { NavButton } from '@/components/atoms';
import { userState } from '@/states/user';

const Navbar = () => {
  const user = useRecoilValue(userState);
  return (
    <Styled.MainContainer>
      <>
        <NavButton bgColor="inherit" color="#e0f2f1" href="/">
          ChainTract
        </NavButton>
      </>
      <>
        <NavButton bgColor="inherit" color="#e0f2f1" href="/contractpage">
          Contract
        </NavButton>
        <NavButton bgColor="inherit" color="#e0f2f1" href="/faq">
          FAQ
        </NavButton>
      </>
      {user ? (
        <>
          <NavButton bgColor="inherit" color="#e0f2f1" href={`/user/${user.id}`}>
            MyPage
          </NavButton>
          {/* logout 처리 추가 해야함 */}
          <NavButton bgColor="inherit" color="#e0f2f1" href="/login">
            Logout
          </NavButton>
        </>
      ) : (
        <>
          <NavButton bgColor="inherit" color="#e0f2f1" href="/login">
            Login
          </NavButton>
        </>
      )}
    </Styled.MainContainer>
  );
};

export default Navbar;
