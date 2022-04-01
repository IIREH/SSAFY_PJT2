import styled from '@emotion/styled';
import blockImg from '/public/blockChain.jpg';

const MainContainer = styled.div`
  width: 100%;
  overflow: hidden;
  min-height: 4000px;
`;

const ImageContainer = styled.div`
  width: 100vw;
  height: 50vh;
  position: relative;
  margin-top: 10vh;
`;

const styleP = styled.p`
  position: relative;
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  left: 50%;
  &:hover {
    color: green;
  }
`;

const test = styled.div`
  background: url('/public/blockChain.jpg');
`;

export default { MainContainer, ImageContainer, styleP, test };
