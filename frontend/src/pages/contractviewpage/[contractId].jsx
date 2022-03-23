import React from 'react';
import ContractViewPageTemplate from 'template/contractViewPage';

const ContractViewPage = ({ contractId }) => {
  return <ContractViewPageTemplate contractId={contractId} />;
};

export async function getServerSideProps(context) {
  const data = context.query.contractId;

  return {
    props: { contractId: data },
  };
}

export default ContractViewPage;
