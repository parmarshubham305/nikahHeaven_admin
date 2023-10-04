import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const Home = props => {
  const {authUser, isInitialFetch} = props;
  if (authUser) {
    return (
      <Redirect
        to={{
          pathname: '/dashboard',
          // state: { from: props.location }
        }}
      />
    );
  }
  if (!isInitialFetch && !authUser) {
    return (
      <Redirect
        to={{
          pathname: '/signin',
          // state: { from: props.location }
        }}
      />
    );
  }
  return <div />;
};

const mapStateToProps = state => {
  return {
    authUser: state.auth.authUser,
    isInitialFetch: state.auth.isInitialFetch,
  };
};

export default connect (mapStateToProps) (Home);
