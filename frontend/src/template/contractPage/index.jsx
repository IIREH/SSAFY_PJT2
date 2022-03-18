import React from 'react';
import Styled from './styled';
import { Navbar } from 'components/molecules';

const contractPageTemplate = () => {
  return (
    <>
      <Navbar />
      <Styled.MainContainer>
        <div>List Section</div>
        <div>main area</div>
      </Styled.MainContainer>
      ;
    </>
  );
};

export default contractPageTemplate;
