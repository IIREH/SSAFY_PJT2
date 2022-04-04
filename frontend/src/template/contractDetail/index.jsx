import React from 'react';
import { Navbar } from 'components/organisms';
import { PDFReader } from 'reactjs-pdf-reader';
import Styled from './styled';
import { Heading } from '@/components/atoms';
import Button from '@material-ui/core/Button';
import router from 'next/router';
import { useQuery } from 'react-query';
import { apiInstance } from '@/libs/axios';
import Typography from '@mui/material/Typography';
import image__loading from "./Spinner-1s-200px.svg";
import Image from 'next/image';


const ContractDetailTemplate = ({ contractId }) => {
  const api = apiInstance();
  // 승인해야하는 계약인지 상태값 부여
  const isApprove = false;

  ///const contractData = useQuery('contractData', () =>
    // 성립된 계약인지 확인하는값 ~~~date 확인해서 isApprove값 변경하는 then작성해야함
    ///api.get(`/contract/0`).then((res) => res),
  ///);

  // const pdfData = useQuery('pdfData', () =>
  //   // 성립된 계약인지 확인하는값 ~~~date 확인해서 isApprove값 변경하는 then작성해야함
  //   api.get(`/contract/0/file`),
  // );
/* 
  if (contractData.isLoading) 
  return (
    <Styled.ContentContainer>
      <Typography variant="h5" gutterBottom>
        Loading...
      </Typography>
      <Image
            src={image__loading}
            alt="image__loading"
            className="image__loading"
          />
      
    </Styled.ContentContainer>
  );
  if (contractData.isError) 
  return (
    <Styled.ContentContainer>
      <Typography variant="h5" gutterBottom>
        An error has occurred: 
      </Typography>
    </Styled.ContentContainer>
  );
  // if (pdfData.isLoading) return 'Loading...';
  // if (pdfData.isError) return 'An error has occurred: ';
  */

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
        <Typography variant="h5" color="#fff" text-shadow="4px 4px 4px rgba(191, 7, 139, 0.7);" gutterBottom>
          계약서 제목
        </Typography>
          <Styled.ArticleArea>
            <span>계약자명</span>
            <span>계약날짜?</span>
          </Styled.ArticleArea>
        </div>
        <div style={{ overflow: 'scroll', height: 600 }}>
          <PDFReader url={'http://www.pdf995.com/samples/pdf.pdf'} />
        </div>
        {isApprove ? (
          <></>
        ) : (
          <Button variant="contained" class="label theme-bg text-white f-12" disableElevation onClick={confirm}>
            승인
          </Button>
        )}
      </Styled.MainContainer>
    </>
  );
};

export default ContractDetailTemplate;
