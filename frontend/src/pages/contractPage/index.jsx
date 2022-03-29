import React from 'react';
import ContractPageTemplate from '@/template/contractPage';
import GuideTemplate from '@/template/guideTemplate';

const ContractPage = () => {
  let userInfo = false;
  if (typeof window !== 'undefined' && window.sessionStorage.chainTractLoginInfo) {
    userInfo = true;
  }

  const privateRoute = () => {
    if (userInfo === false) {
      return <GuideTemplate />;
    }
    return <ContractPageTemplate />;
  };

  return privateRoute();
};

export default ContractPage;
