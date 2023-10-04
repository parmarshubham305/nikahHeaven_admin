import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {CHeader, CToggler, CHeaderBrand, CHeaderNav} from '@coreui/react';
import CIcon from '@coreui/icons-react';

import {TheHeaderDropdown} from './index';

const TheHeader = props => {
  const dispatch = useDispatch ();
  const sidebarShow = useSelector (state => props.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes (sidebarShow)
      ? false
      : 'responsive';
    dispatch ({type: 'set', sidebarShow: val});
  };

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes (sidebarShow)
      ? true
      : 'responsive';
    dispatch ({type: 'set', sidebarShow: val});
  };

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/" />
      <CHeaderNav className="d-md-down-none mr-auto" />
      <CHeaderNav className="px-3">
        <TheHeaderDropdown {...props} />
      </CHeaderNav>
    </CHeader>
  );
};

export default TheHeader;
