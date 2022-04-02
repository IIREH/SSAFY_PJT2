import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/organisms';
import Styled from './styled';

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
          <Styled.styleH1>hi</Styled.styleH1>
        </Styled.ContentContainer>
        <Styled.ContentContainer scrollHeight={scrollHeight}>
          <Styled.styleH1>2</Styled.styleH1>
        </Styled.ContentContainer>
        <Styled.ContentContainer scrollHeight={scrollHeight}>
          <Styled.styleH1>3</Styled.styleH1>
        </Styled.ContentContainer>
        <Styled.ContentContainer scrollHeight={scrollHeight}>
          <Styled.styleH1>4</Styled.styleH1>
        </Styled.ContentContainer>
        <Styled.ContentContainer scrollHeight={scrollHeight}>
          <Styled.styleH1>5</Styled.styleH1>
        </Styled.ContentContainer>
      </Styled.MainContainer>
    </>
  );
};

export default index;
