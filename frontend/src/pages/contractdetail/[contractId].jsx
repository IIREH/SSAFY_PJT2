import React from 'react';
// import ContractViewPageTemplate from 'template/contractViewPage';
import dynamic from 'next/dynamic';

const NoSSR = dynamic(() => import('template/contractDetail'), {
  ssr: false,
});

const ContractDetail = ({ contractId }) => {
  return <NoSSR contractId={contractId} />;
};

export async function getServerSideProps(context) {
  const data = context.query.contractId;

  return {
    props: { contractId: data },
  };
}

export default ContractDetail;
