import React from 'react';
import Styled from './styled';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { apiInstance } from '@/libs/axios';
import Typography from '@mui/material/Typography';
import image__loading from './Spinner-1s-200px.svg';
import Image from 'next/image';
import { Navbar } from 'components/organisms';
import { PDFReader } from 'reactjs-pdf-reader';

const ContractDetailTemplate = ({ contractId }) => {
  const router = useRouter();
  let userInfo = '';
  if (typeof window !== 'undefined' && window.sessionStorage) {
    userInfo = sessionStorage.getItem('chainTractLoginInfo');
  }
  const api = apiInstance();

  const contractData = useQuery('contractData', () => api.get(`/contract/${contractId}`));
  if (contractData.isLoading)
    return (
      <Styled.ContentContainer>
        <Typography variant="h5" gutterBottom>
          Loading...
        </Typography>
        <Image src={image__loading} alt="image__loading" className="image__loading" />
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
    api.put(`/contract/sign/${contractId}`, { email: userInfo });
    alert('계약을 승인했습니다');
    router.replace('/contractpage');
  };

  return (
    <>
      <div className="navbar">
        <Navbar />
        <Styled.MainContainer>
          <Styled.contractContainer>
            <Typography
              variant="h1"
              color="#fff"
              text-shadow="4px 4px 4px rgba(191, 7, 139, 0.7);"
              gutterBottom
            >
              {contractData.data.data.response.name}
            </Typography>
            <Styled.ArticleArea>
              {contractData.data.data.response.participantEmails.map((covenantor) => {
                return <div key={covenantor}>계약자 : {covenantor}</div>;
              })}
              <hr />
              <div>날짜 : {contractData.data.data.response.createdDate.slice(0, 10)}</div>
            </Styled.ArticleArea>
          </Styled.contractContainer>
          <div style={{ overflow: 'scroll', height: 1000 }}>
            <PDFReader url={`https://j6c105.p.ssafy.io/api/contract/${contractId}/file`} />
          </div>
          {contractData.data.data.response.establishedDate !== null ? (
            <></>
          ) : (
            <>
              <Styled.warningH>주의 : 계약을 승인하면 기록에서 삭제할 수 없습니다.</Styled.warningH>
              <Button
                variant="contained"
                class="label theme-bg text-white f-12"
                disableElevation
                onClick={confirm}
              >
                승인
              </Button>
            </>
          )}
        </Styled.MainContainer>
      </div>
    </>
  );
};

export default ContractDetailTemplate;
