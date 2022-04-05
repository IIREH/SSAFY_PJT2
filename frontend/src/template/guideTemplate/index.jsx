import React from 'react';
import Link from 'next/link';
import { Heading } from '@/components/atoms';
import { Navbar } from '@/components/organisms';
import Button from '@material-ui/core/Button';

const GuideTemplate = () => {
  return (
    <>
      <Navbar />
      <Heading>로그인 후 이용해주세요</Heading>
      <div>
        <div>
          문의 사항이 있으신가요?
          <Link href="/faq" passHref>
            <Button variant="contained" color="primary" disableElevation>
              FAQ로 가기
            </Button>
          </Link>
        </div>
        <div>
          로그인이 필요하세요?
          <Link href="/" passHref>
            <Button variant="contained" color="primary" disableElevation>
              홈으로 가기
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default GuideTemplate;
