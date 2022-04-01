import React from 'react';
///import Styled from './styled';
///import { Navbar } from 'components/organisms';

///import '@/pages/faq/scss/main.scss';
///import '../scss/main.css'
import '../../pages/_app.jsx';
import Card from "components/Card";

// import "../css/main.css";

// import "../scss/main.scss";

import illustration__box from "../../pages/faq/images/illustration-box-desktop.svg";
import illustration__woman_desktop from "../../pages/faq/images/illustration-woman-online-desktop.svg";

const questionsAnswers = [
  {
    question: "다수의 블록체인 노드에 개인정보가 공유되는 것 아닌가요?",
    answer:
      "블록체인에는 개인정보의 해쉬값이 공유되는 것이지 개인정보 자체가 공유되지 않습니다.",
  },
  {
    question: "문서의 진행상황은 어떻게 확인하나요?",
    answer:
      "로그인 후 Menu-ChainTract에서 확인하실 수 있습니다.",
  },
  {
    question: "1건의 계약 시 여러 명이 참여할 수 있나요?",
    answer: `네, 가능합니다. 여러 명의 참여자가 계약서에 서명할 수 있습니다.`,
  },
  {
    question: "전자계약과 전자서명이 법적 효력이 있나요?",
    answer: `전자서명법 제3조 2항과 전자문서및전자거래기본법 제4조 제1항에 의해 법적 효력이 인정됩니다.`,
  },
  {
    question: "메일이나 아이디 변경이 가능한가요?",
    answer: `ChainTract는 카카오톡으로 가입을 진행하기 때문에 변경을 지원하고 있지 않습니다. 변경할 이메일로 새로 가입해주세요. `,
  },
];

const FaqTemplate = () => {
  return (
    <div className="container">
      <div className="component">
        <div className="illustration">
          <img
            src={illustration__box}
            alt="illustration with box"
            className="illustration__box"
          />

          <img
            className="illustration__woman-desktop"
            src={illustration__woman_desktop}
            alt="illustration with woman"
          />
          <img
            className="illustration__woman-mobile"
            src={illustration__woman_mobile}
            alt="illustration with woman"
          />
        </div>
        <Card questionsAnswers={questionsAnswers} />
      </div>
    
 
       

    </div>
  );
};

export default FaqTemplate;