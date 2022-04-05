import styled from '@emotion/styled';

const MainContainer = styled.div`
  width: 1535px;
  height: 95vh;
  overflow: hidden;
  
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  top: ${(props) => props.scrollHeight}vh;
  transition: all 1.5s;
  
`;

const imageStyle = styled.div`
  width: 700px;

  
`;

const imageStyle2 = styled.div`
  position: absolute;
  left:-300px;
  top: -30px;

`;

const imageStyleChaintract = styled.div`
  position:relative;
  left: 300px;
  top: -50px;
`;

const stylePage1 = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 13em;
  font-weight: bold;
  line-height: 12vh;
  color: #fff;
  text-shadow: 4px 4px 4px rgba(191, 7, 139, 0.1);
`;
const stylePage2 = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4em;
  font-weight: bold;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
  line-height: 6vh;
  width: 80%;
`;
const stylePage3 = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 5em;
  font-weight: bold;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
  letter-spacing: 0;
  line-height: 7vh;
  width: 80%;
`;
const stylePage4 = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 5em;
  font-weight: bold;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
  line-height: 7vh;
  width: 80%;
`;
const stylePage5 = styled.div`
  color: black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3em;
  font-weight: bold;
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
  width: 80%;
`;

const styleP = styled.p`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  font-size: 0.1em;
  margin-top: 5vh;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
`;

const styleDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  line-height: 3vh;
  font-size: 0.7em;
`;

const page5Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: flex-start;
  margin: 5vh 0 0 0;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
`;

const arrow = styled.div`
  padding: 7vh 1vw 0 1vw;
`;

export default {
  MainContainer,
  ContentContainer,
  stylePage1,
  stylePage2,
  stylePage3,
  stylePage4,
  stylePage5,
  styleP,
  styleDiv,
  page5Container,
  arrow,
  imageStyle,
  imageStyle2,
  imageStyleChaintract,
};

