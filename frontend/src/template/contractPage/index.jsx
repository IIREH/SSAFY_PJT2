import React from 'react';
import Styled from './styled';
import { Navbar } from 'components/molecules';
import { useRecoilValue } from 'recoil';
import { contractPageState } from '@/states/contractPage';
import { ContractPageList } from 'components/organisms';
import { Basic, Complete, Ongoing, Sign, Write } from './renderPages';

const ContractPageTemplate = () => {
  const pageState = useRecoilValue(contractPageState);

  const renderPage = () => {
    switch (pageState) {
      case '작성':
        return <Write />;
      case '요청보기':
        return <Sign />;
      case '진행중':
        return <Ongoing />;
      case '완료':
        return <Complete />;
      default:
        return <Basic />;
    }
  };

  return (
    <>
      <Navbar />
      <Styled.MainContainer>
        <Styled.ListContainer>
          <ContractPageList />
        </Styled.ListContainer>
        <Styled.ViewContainer>
          <>{renderPage()}</>
        </Styled.ViewContainer>
      </Styled.MainContainer>
      ;
    </>
  );
};

export default ContractPageTemplate;
