import React from 'react';
import UserTemplate from '@/template/user';

const User = ({ userId }) => {
  return <UserTemplate userId={userId} />;
};

export async function getServerSideProps(context) {
  const data = context.query.userId;
  return {
    props: { userId: data },
  };
}

export default User;
