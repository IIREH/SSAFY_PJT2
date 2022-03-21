import styled from '@emotion/styled';

const NavButton = styled.a`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  :hover {
    transform: scale(1.1);
    transition: 1s;
  }
`;

export default { NavButton };
