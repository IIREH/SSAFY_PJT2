import React from 'react';
import Styled from './styled';
import { Navbar } from '@/components/organisms';
import { userState } from '@/states';
import { useRecoilState } from 'recoil';

const UserTemplate = ({ userId }) => {
  const [user, setUser] = useRecoilState(userState);

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