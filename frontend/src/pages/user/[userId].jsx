import React from 'react';
import UserTemplate from '@/template/user';
import GuideTemplate from '@/template/guideTemplate';

const User = ({ userId }) => {
  let userInfo = false;
  if (typeof window !== 'undefined' && window.sessionStorage.chainTractLoginInfo) {
    userInfo = true;
  }

  const privateRoute = () => {
    if (userInfo === false) {
      return <GuideTemplate />;
    }
    return <UserTemplate userId={userId} />;
  };

  return privateRoute();
};

export async function getServerSideProps(context) {
  const data = context.query.userId;
  return {
    props: { userId: data },
  };
}

export default User;
