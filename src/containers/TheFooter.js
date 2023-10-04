import React from 'react';
import {CFooter} from '@coreui/react';

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer" style={{color: '#eb578199', fontWeight: '800'}}>
          NikahHeaven
        </a>
        <span className="ml-1" style={{color: '#eb578199', fontWeight: '800'}}>&copy; 2023</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a
          href="https://coreui.io/react"
          target="_blank"
          rel="noopener noreferrer"
          style={{color: '#eb5781', fontWeight: '800'}}
        >
          NikahHeaven
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo (TheFooter);
