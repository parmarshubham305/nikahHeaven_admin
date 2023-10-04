import React from 'react';
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {signOutAction} from 'src/actions/userAction';
import {connect} from 'react-redux';

const TheHeaderDropdown = props => {
  const userProfile = () => {
    props.history.push ('/user_profile');
  };

  const userSettings = () => {};

  const lockAccount = () => {
    props.signOut ().then().catch(error => {
      alert(error)
    });
  };

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={props.authUser.profilePic}
            className="c-avatar-img"
            style={{width: 35, height: 35, backgroundColor: 'lightgray'}}
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={userProfile}>
          <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
        {/*<CDropdownItem onClick={userSettings}>*/}
        {/*  <CIcon name="cil-settings" className="mfe-2" />*/}
        {/*  Settings*/}
        {/*</CDropdownItem>*/}
        <CDropdownItem divider />
        <CDropdownItem onClick={lockAccount}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Lock Account
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

const mapStateToProps = state => ({
  authUser: state.auth.authUser,
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch (signOutAction ()),
});

export default connect (mapStateToProps, mapDispatchToProps) (
  TheHeaderDropdown
);
