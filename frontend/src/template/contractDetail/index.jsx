import React from 'react';
import Styled from './styled';
import Button from '@material-ui/core/Button';
import router from 'next/router';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';
import { apiInstance } from '@/libs/axios';
import Typography from '@mui/material/Typography';
import image__loading from "./Spinner-1s-200px.svg";
import Image from 'next/image';
import { Navbar } from 'components/organisms';
import { PDFReader } from 'reactjs-pdf-reader';
  
const ContractDetailTemplate = ({ contractId }) => {
  let userInfo = '';
  if (typeof window !== 'undefined' && window.sessionStorage) {
    userInfo = sessionStorage.getItem('chainTractLoginInfo');
  }
  const api = apiInstance();

  const contractData = useQuery(
    'contractData',
    () =>
      // 성립된 계약인지 확인하는값 ~~~date 확인해서 isApprove값 변경하는 then작성해야함
      api.get(`/contract/2`),
    // api.get(`/contract/${contractId}`),
  );
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

  // 승인 처리
  const confirm = () => {
    api.put(`/contract/sign/2`, { email: userInfo });
    // 배포할때 바꿔주기
    // api.put(`/contract/sign/${contractId}`, { email: userInfo });
    alert('계약을 승인했습니다');
    router.replace('/contractpage');
  };

  return (
    <>
    <div className="navbar">
      <Navbar />
      <Styled.MainContainer>
        <div>
          <Typography
            variant="h5"
            color="#fff"
            text-shadow="4px 4px 4px rgba(191, 7, 139, 0.7);"
            gutterBottom
          >
            {contractData.data.data.response.name}
          </Typography>
          <Styled.ArticleArea>
            계약자 :
            {contractData.data.data.response.participantEmails.map((covenantor) => {
              return <p key={covenantor}>{covenantor}</p>;
            })}
            <span>날짜 : {contractData.data.data.response.createdDate.slice(0, 10)}</span>
          </Styled.ArticleArea>
        </div>
        <div style={{ overflow: 'scroll', height: 600 }}>
          {/* 배포할때 바꿔주기 */}
          {/* <PDFReader url={`https://j6c105.p.ssafy.io/api/contract/${contractId}/file`} /> */}
          <PDFReader url={`https://j6c105.p.ssafy.io/api/contract/17/file`} />
        </div>
        {contractData.data.data.response.establishedDate !== null ? (
          <></>
        ) : (
          <Button 
          variant="contained" 
          className="label theme-bg text-white f-12" 
          disableElevation 
          onClick={confirm}
          >
            승인
          </Button>
        )}
      </Styled.MainContainer>
      </div>
    </>
  );
};

export default ContractDetailTemplate;
