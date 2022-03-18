import React from 'react';
import Styled from './Navbar.styled';

import { NavButton, Heading } from '@/components/atoms';

const Navbar = () => {
  return (
    <Styled.MainContainer>
      <>
        <Heading children="ChainTract" />
      </>
      <>
        <NavButton children="Contract" bgColor="inherit" color="#fafafa" onClick="" />
        <NavButton children="FAQ" bgColor="inherit" color="#e0f2f1" />
        <NavButton children="MyPage" bgColor="inherit" color="#e0f2f1" />
      </>
      <>
        <NavButton children="Login" bgColor="inherit" color="#e0f2f1" />
      </>
    </Styled.MainContainer>
  );
};

export default Navbar;
