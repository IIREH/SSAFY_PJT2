import styled from '@emotion/styled';

const MainContainer = styled.div`
  display: flex;

  flex-flow: column nowrap;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 100px;
  height: 100px;
  text-align: center;
  position: absolute;
  color: white;
  transition: all 1.5s;
`;

const ArticleArea = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

export default { MainContainer, ContentContainer, ArticleArea };
