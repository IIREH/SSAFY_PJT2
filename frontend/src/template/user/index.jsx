import React from 'react';
import Styled from './styled';
import { Navbar } from '@/components/organisms';
import { userState } from '@/states';

const UserTemplate = ({ userId }) => {
  return (
    <>
      <Navbar />
      <Styled.MainContainer>
        props : {userId} haha userInfo : {user.name}, {user.id}
      </Styled.MainContainer>
    </>
  );
};

export default UserTemplate;
