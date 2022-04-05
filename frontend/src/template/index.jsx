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
import illustration__main from '/public/main.png';
import page2 from '/public/page2.png';

const index = () => {
  const [scrollHeight, setScrollHeight] = useState(0);
  const onWheel = (e) => {
    console.log(scrollHeight)
    console.log(e)
    e.preventDefault();
    if (e.deltaY === -500 && scrollHeight !== 0) {
      setScrollHeight(scrollHeight + 95);
    } else if (e.deltaY === 500 && scrollHeight !== -380) {
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
      <div class="navbar">
      <Navbar />
      <Styled.MainContainer>
        <Styled.ContentContainer scrollHeight={scrollHeight}>
          <Styled.stylePage1>
            <Styled.imageStyle>
              <Image
                src={illustration__main}
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
            <Styled.imageStyle2>
                <Image
                  src={illustration__security}
                  width={550} height={550}
                />
              </Styled.imageStyle2>
              <Styled.imageStyleChaintract>
                <Image
                  src={page2}
                
                />
              </Styled.imageStyleChaintract>
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
      </div>
    </>
  );
};

export default index;
