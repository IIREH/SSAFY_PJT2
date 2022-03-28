import React from 'react';
// import ContractViewPageTemplate from 'template/contractViewPage';
import dynamic from 'next/dynamic';

const NoSSR = dynamic(() => import('@/template/contractViewPage'), {
  ssr: false,
});

const ContractViewPage = ({ contractId }) => {
  return <NoSSR contractId={contractId} />;
};

export async function getServerSideProps(context) {
  const data = context.query.contractId;

  return {
    props: { contractId: data },
  };
}

export default ContractViewPage;
