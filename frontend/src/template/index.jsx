import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/organisms';
import Styled from './styled';
import blockImg from '/public/blockChain.jpg';
import Image from 'next/image';

const index = () => {
  const [position, setPosition] = useState(0);

  const onScroll = () => {
    setPosition(window.scrollY);
    console.log(position);
  };
  useEffect(() => {
    window.addEventListener(
      'wheel',
      function (e) {
        e.preventDefault();
      },
      { passive: false },
    );
    // return () => {
    //   window.removeEventListener('scroll', onScroll);
    // };
  }, []);

  return (
    <>
      <Navbar />
      <Styled.MainContainer>
        <Styled.ContentContainer>
          <Styled.styleH1>1</Styled.styleH1>
        </Styled.ContentContainer>
        <Styled.ContentContainer>
          <Styled.styleH1>2</Styled.styleH1>
        </Styled.ContentContainer>
        <Styled.ContentContainer>
          <Styled.styleH1>3</Styled.styleH1>
        </Styled.ContentContainer>
        <Styled.ContentContainer>
          <Styled.styleH1>4</Styled.styleH1>
        </Styled.ContentContainer>
        <Styled.ContentContainer>
          <Styled.styleH1>5</Styled.styleH1>
        </Styled.ContentContainer>
      </Styled.MainContainer>
    </>
  );
};

export default index;
