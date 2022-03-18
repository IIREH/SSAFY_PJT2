import styled from '@emotion/styled';

const Heading = styled.h1`
  margin: 0;
  font-weight: 700;
  text-align: center;
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
`;

export default { Heading };
