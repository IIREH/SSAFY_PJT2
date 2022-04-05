import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/organisms';
import Styled from './styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';
import handsImg from '/public/hands.png';
import documentImg from '/public/document.svg';
import exDocumentImg from '/public/exDocument.svg';
import penImg from '/public/pen.svg';
import chainImg from '/public/chain.svg';
import illustration__security from '/public/secure_image.gif';

const index = () => {
  const [scrollHeight, setScrollHeight] = useState(0);
  const onWheel = (e) => {
    e.preventDefault();
    if (e.deltaY === -100 && scrollHeight !== 0) {
      setScrollHeight(scrollHeight + 95);
    } else if (e.deltaY === 100 && scrollHeight !== -380) {
      setScrollHeight(scrollHeight - 95);
    }
  };
  useEffect(() => {
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
    };
  }, [scrollHeight]);

  return (
    <>
      <Navbar />
      <Styled.MainContainer>
        <Styled.ContentContainer scrollHeight={scrollHeight}>
          <Styled.stylePage1>
            Chain Contract
            <Styled.imageStyle>
            <Image
            src={illustration__security}
            alt="illustration with security"
            className="illustration__security"
          />
          </Styled.imageStyle>
            <Styled.styleP>
              스크롤을 아래로 내려주세요
              <ExpandMoreIcon />
            </Styled.styleP>
          </Styled.stylePage1>
        </Styled.ContentContainer>
        <Styled.ContentContainer scrollHeight={scrollHeight}>
          <Styled.stylePage2>
            <Image src={documentImg} width={100} height={100} />
            Chain Tract란, <br />
            <br />
            기존의 전자계약 시스템에 블록체인 기술을 활용하여 신뢰를 추가하는 새로운 ‘계약
            플랫폼’입니다.
          </Styled.stylePage2>
        </Styled.ContentContainer>
        <Styled.ContentContainer scrollHeight={scrollHeight}>
          <Styled.stylePage5>
            <div>계약은 이렇게 진행 됩니다</div>
            <Styled.page5Container>
              <Styled.styleDiv>
                <Image src={exDocumentImg} width={100} height={100} />
                <p>PDF 파일 첨부</p>
                <p>계약자 선택</p>
                <p>계약 요청</p>
              </Styled.styleDiv>
              <Styled.arrow>
                <ArrowForwardIcon />
              </Styled.arrow>
              <Styled.styleDiv>
                <Image src={penImg} width={100} height={100} />
                <p>계약 확인</p>
                <p>계약 승인</p>
              </Styled.styleDiv>
              <Styled.arrow>
                <ArrowForwardIcon />
              </Styled.arrow>
              <Styled.styleDiv>
                <Image src={chainImg} width={100} height={100} />
                <p>계약 성립</p>
                <p>서버 기록</p>
                <p>블록체인 기록</p>
              </Styled.styleDiv>
              <Styled.arrow>
                <ArrowForwardIcon />
              </Styled.arrow>
              <Styled.styleDiv>
                <Image src={handsImg} width={100} height={100} />
                <p>계약 성립</p>
              </Styled.styleDiv>
            </Styled.page5Container>
          </Styled.stylePage5>
        </Styled.ContentContainer>
        <Styled.ContentContainer scrollHeight={scrollHeight}>
          <Styled.stylePage3>
            Chain Tract에서는 손쉽게 계약서를 업로드하고 성사 시킬 수 있습니다
            <br />
            <Image src={handsImg} width={100} height={100} />
          </Styled.stylePage3>
        </Styled.ContentContainer>
        <Styled.ContentContainer scrollHeight={scrollHeight}>
          <Styled.stylePage4>
            카카오 아이디를 이용해
            <br />
            손쉽게 로그인하고
            <br />
            계약을 만들어 보세요!
          </Styled.stylePage4>
        </Styled.ContentContainer>
      </Styled.MainContainer>
    </>
  );
};

export default index;
