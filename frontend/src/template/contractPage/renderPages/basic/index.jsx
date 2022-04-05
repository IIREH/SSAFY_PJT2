import React from 'react';
import Image from 'next/image';
import illustration__contract from "../../../../pages/faq/images/contract.png";

const Basic = () => {
  return (
  <div className="container">
 
    <div className="illustration">
      <Image
        src={illustration__contract}
        alt="illustration with contract"
        className="illustration__contract"
      />
    </div>
  </div>

  );
};

export default Basic;
