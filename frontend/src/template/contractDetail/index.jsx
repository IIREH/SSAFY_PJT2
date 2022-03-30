import React from 'react';
import { Navbar } from 'components/organisms';
import { PDFReader } from 'reactjs-pdf-reader';
import Styled from './styled';
import { Heading } from '@/components/atoms';
import Button from '@material-ui/core/Button';
import router from 'next/router';
import { useQuery } from 'react-query';
import { apiInstance } from '@/libs/axios';

const ContractDetailTemplate = ({ contractId }) => {
  const api = apiInstance();
  // 승인해야하는 계약인지 상태값 부여
  const isApprove = false;

  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch(`http://localhost:8080/api/contract/${contractId}`),
  );
  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  const confirm = () => {
    api.put(`/api/contract/sign/${contractId}`);
    alert('계약을 승인했습니다');
    router.replace('/contractpage');
  };

  return (
    <>
      <Navbar />
      <Styled.MainContainer>
        <div>
          <Heading>제목</Heading>
          <Styled.ArticleArea>
            <span>계약자</span>
            <span>일자</span>
          </Styled.ArticleArea>
        </div>
        <div style={{ overflow: 'scroll', height: 600 }}>
          <PDFReader url={'http://www.pdf995.com/samples/pdf.pdf'} />
        </div>
        {isApprove ? (
          <></>
        ) : (
          <Button variant="contained" color="primary" disableElevation onClick={confirm}>
            승인
          </Button>
        )}
      </Styled.MainContainer>
    </>
  );
};

export default ContractDetailTemplate;
