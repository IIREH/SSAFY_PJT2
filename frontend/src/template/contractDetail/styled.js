import styled from '@emotion/styled';

const MainContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 95vw;
  height: 100%;
`;

const ContentContainer = styled.div`
  width: 200px;
  height: 100px;
  text-align: center;
  position: absolute;
  color: white;
  transition: all 1.5s;
`;

const contractContainer = styled.div`
  padding: 2vh 5vw 2vh 0;
`;

const ArticleArea = styled.div`
  display: flex;
  color: white;
  flex-flow: column nowrap;
  justify-content: space-between;
`;

const warningH = styled.h2`
  padding: 2vh 0 2vh 0;
  color: white;
`;

const layoutBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-top: 2vh;
`;

export default {
  MainContainer,
  ContentContainer,
  ArticleArea,
  warningH,
  contractContainer,
  layoutBox,
};
