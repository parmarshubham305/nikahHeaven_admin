import React, { lazy, useEffect } from 'react'
import {connect} from 'react-redux';
import {getAllSwipUsersAction, getAllUsersAction, getAllMatchUsersAction, getAllSeekerRequestsAction, getAllMeetingsInfo} from 'src/actions/userAction';

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))

const Dashboard = props => {

  useEffect (() => {
    const unsubscribe = props.getAllUsers ();
    return unsubscribe;
  }, []);

  useEffect (() => {
    const unsubscribe = props.getAllSwipes ();
    return unsubscribe;
  }, []);

  useEffect (() => {
    const unsubscribe = props.getAllSeekers ();
    return unsubscribe;
  }, []);

  useEffect (() => {
    const unsubscribe = props.getAllMatches ();
    return unsubscribe;
  }, []);

//   useEffect (() => {
//     const unsubscribe = props.getAllMeetings ();
//     console.log('unsubscribe==>', unsubscribe)
//     return unsubscribe;
//   }, []);

  return (
    <WidgetsDropdown {...props} />
  );
};

const mapStateToProps = state => ({
  allUsers: state.auth.allUsers,
  swipedUsers: state.auth.swipeUsers,
  matchedUsers: state.auth.matchUsers,
  paidUsers: state.auth.subscriptionUsers,
  seekerRequests: state.auth.seekerRequests,
  meetingsRequests: state.auth.meetings,
});

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch (getAllUsersAction ()),
  getAllSwipes: () => dispatch (getAllSwipUsersAction ()),
  getAllSeekers: () => dispatch (getAllSeekerRequestsAction ()),
  getAllMatches: () => dispatch (getAllMatchUsersAction ()),
  getAllMeetings: () => dispatch (getAllMeetingsInfo ()),
});

export default connect (mapStateToProps, mapDispatchToProps) (Dashboard);