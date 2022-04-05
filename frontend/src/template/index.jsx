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
import page3 from '/public/page3.png';
import page4 from '/public/page4.png';
import page5 from '/public/page5.png';

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
      <div className="navbar">
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
                <Image src={page3}  />
        </Styled.ContentContainer>

        <Styled.ContentContainer scrollHeight={scrollHeight}>
            <Image src={page4}  />
           
        </Styled.ContentContainer>

        <Styled.ContentContainer scrollHeight={scrollHeight}>
          <Image src={page5}  />
          
        </Styled.ContentContainer>
      </Styled.MainContainer>
      </div>
    </>
  );
};

export default index;
