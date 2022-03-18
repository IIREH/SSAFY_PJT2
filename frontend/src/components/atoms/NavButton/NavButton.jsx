import React from 'react';

import Styled from './NavButton.styled';

const NavButton = ({ children, bgColor, color }) => {
  return (
    <Styled.NavButton bgColor={bgColor} color={color}>
      {children}
    </Styled.NavButton>
  );
};

export default NavButton;
