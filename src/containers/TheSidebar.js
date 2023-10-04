import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg,
  CLabel
} from '@coreui/react';

import CIcon from '@coreui/icons-react';

// sidebar nav config
import navigation from './_nav';

const TheSidebar = props => {
  const dispatch = useDispatch ();
  const show = useSelector (state => props.sidebarShow);

  return (
    <CSidebar
      show={show}
      onShowChange={val => dispatch ({type: 'set', sidebarShow: val})}
    >
      <CSidebarBrand className="d-md-down-none" to="/" style={{backgroundColor: '#eb5781', padding: 20}}>
          <CImg
            src={'avatars/splash_logo.png'}
            style={{width: 45, height: 40}}
          />
          <CLabel style={{font: 18, fontWeight: '800', paddingLeft: 15}}>
             NikahHeaven
          </CLabel>
      </CSidebarBrand>
      <CSidebarNav style={{backgroundColor: '#eb5781'}}>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      {/* <CSidebarMinimizer className="c-d-md-down-none" /> */}
    </CSidebar>
  );
};

export default React.memo (TheSidebar);
