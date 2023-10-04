import React from 'react';
import {connect} from 'react-redux';
import {TheContent, TheSidebar, TheFooter, TheHeader} from './index';

const TheLayout = props => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar {...props} />
      <div className="c-wrapper">
        <TheHeader {...props} />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  sidebarShow: state.auth.sidebarShow,
});

const mapDispatchToProps = dispatch => ({});

export default connect (mapStateToProps, mapDispatchToProps) (TheLayout);
