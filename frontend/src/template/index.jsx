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
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Styled.MainContainer>
        <Styled.ImageContainer>
          <Image src={blockImg} layout="fill" />
        </Styled.ImageContainer>

        <Styled.test>dd</Styled.test>

        <Styled.styleP style={{ transform: `translateX(${-position}px)` }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </Styled.styleP>
      </Styled.MainContainer>
    </>
  );
};

export default index;
