import React from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { userState } from '@/states';

import { Navbar } from '@/components/molecules';

const index = () => {
  // recoil 사용 예시
  const [user, setUser] = useRecoilState(userState);
  // react쿼리 예시
  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch('https://api.github.com/repos/tannerlinsley/react-query').then((res) => res.json()),
  );

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  const addBtn = (e) => {
    setUser((user) => ({
      ...user,
      name: user.name + '1',
    }));
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        <strong>👀 {data.subscribers_count}</strong> <strong>✨ {data.stargazers_count}</strong>{' '}
        <strong>🍴 {data.forks_count}</strong>
      </div>
      {user.name}
      <button onClick={addBtn}>추가버튼</button>
    </>
  );
};

export default index;
