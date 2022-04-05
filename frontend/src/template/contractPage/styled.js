import styled from '@emotion/styled';

const MainContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  color: black;
  width: 100%;
  height: 100%;
`;

const ListContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 15vw;

`;

const ViewContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 91vh;
`;

export default {
  MainContainer,

  ViewContainer,
};
