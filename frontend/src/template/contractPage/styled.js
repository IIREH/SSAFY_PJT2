import styled from '@emotion/styled';

const MainContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  color: green;
  width: 100%;
  height: 100%;
`;

const ListContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 15vw;
`;

const ViewContainer = styled.div`
  width: 85vw;
`;

export default {
  MainContainer,
  ListContainer,
  ViewContainer,
};
