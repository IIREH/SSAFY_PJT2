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

  const contractData = useQuery('contractData', () =>
    // 성립된 계약인지 확인하는값 ~~~date 확인해서 isApprove값 변경하는 then작성해야함
    api.get(`/contract/0`).then((res) => res),
  );

  // const pdfData = useQuery('pdfData', () =>
  //   // 성립된 계약인지 확인하는값 ~~~date 확인해서 isApprove값 변경하는 then작성해야함
  //   api.get(`/contract/0/file`),
  // );

  if (contractData.isLoading) return 'Loading...';
  if (contractData.isError) return 'An error has occurred: ';
  // if (pdfData.isLoading) return 'Loading...';
  // if (pdfData.isError) return 'An error has occurred: ';

  const confirm = () => {
    api.put(`/contract/sign/0`);
    alert('계약을 승인했습니다');
    router.replace('/contractpage');
  };

  return (
    <>
      <Navbar />
      <Styled.MainContainer>
        <div>
          <Heading>{contractData.data.data.response.name}</Heading>
          <Styled.ArticleArea>
            <span>{contractData.data.data.response.participantIds}</span>
            <span>{contractData.data.data.response.establishedDate}</span>
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
