import React, { useState } from 'react';
import { Navbar } from 'components/molecules';

const ContractViewPageTemplate = ({ contractId }) => {
  return (
    <>
      <Navbar />
      <h1>pdf 뷰어 및 계약 정보 보여주는 칸</h1>
      {contractId}
    </>
  );
};

export default ContractViewPageTemplate;
