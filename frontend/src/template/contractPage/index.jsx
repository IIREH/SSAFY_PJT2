import React from 'react';
import Styled from './styled';
import { Navbar } from 'components/organisms';
import { useRecoilValue } from 'recoil';
import { contractPageState } from '@/states';
import { ContractListMenu } from 'components/molecules';
import { Basic, Complete, Ongoing, Sign, Write } from './renderPages';

const ContractPageTemplate = () => {
  const pageState = useRecoilValue(contractPageState);

  const renderPage = () => {
    switch (pageState) {
      case 0:
        return <Basic />;
      case '작성':
        return <Write />;
      case '승인 대기':
        return <Sign />;
      case '성립전':
        return <Ongoing />;
      case '이행중':
        return <Complete />;
      // default:
      //   return <Basic />;
    }
  };

  return (
    <>
      <Navbar />
      <Styled.MainContainer>
        <ContractListMenu />
        <Styled.ViewContainer>
          <>{renderPage()}</>
        </Styled.ViewContainer>
      </Styled.MainContainer>
      ;
    </>
  );
};

export default ContractPageTemplate;
