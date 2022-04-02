import styled from '@emotion/styled';

const MainContainer = styled.div`
  width: 100%;
  height: 95vh;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: blueviolet;
  position: relative;
  top: ${(props) => props.scrollHeight}vh;
  transition: all 1.5s;
`;

const styleH1 = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20em;
  font-weight: bold;
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
`;

export default { MainContainer, ContentContainer, styleH1 };
