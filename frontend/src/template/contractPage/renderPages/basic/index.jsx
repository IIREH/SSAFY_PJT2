import React from 'react';
import Image from 'next/image';
import illustration__contract from "../../../../pages/faq/images/contract.png";
import Styled from './styled';

const Basic = () => {
  return (
  <div className="container">
 
    <div className="illustration">
      <Styled.imageStyle>
      
      <Image
        src={illustration__contract}
        alt="illustration with contract"
        className="illustration__contract"
      />
      </Styled.imageStyle>
    </div>
  </div>

  );
};

export default Basic;
