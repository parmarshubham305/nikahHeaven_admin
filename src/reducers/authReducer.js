import * as UserActionTypes from 'src/actions/userActionTypes';
import {auth} from 'src/firebase/firebase';

const initialState = {
  sidebarShow: 'responsive',
  isInitialFetch: true,
  isLoading: false,
  authUser: auth.currentUser,
  authError: null,
  allUsers: [],
  swipeUsers: [],
  matchUsers: [],
  subscriptionUsers: [],
  seekerRequests: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'set':
      return {...state, sidebarShow: action.sidebarShow};
    // sign up actions
    case UserActionTypes.SIGNUP_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UserActionTypes.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authUser: action.payload,
      };
    case UserActionTypes.SIGNUP_USER_ERROR:
      return {
        ...state,
        authUser: null,
        isLoading: false,
        authError: action.err.message,
      };
    // sign in actions
    case UserActionTypes.SIGNIN_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UserActionTypes.SIGNIN_USER_SUCCESS:
      return {
        ...state,
        isInitialFetch: false,
        isLoading: false,
        authUser: action.payload,
      };
    case UserActionTypes.SIGNIN_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        authUser: null,
        authError: action.err.message,
      };
    // sign out actions
    case UserActionTypes.SIGNOUT_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UserActionTypes.SIGNOUT_USER_SUCCESS:
      return {
        ...state,
        isInitialFetch: false,
        isLoading: false,
        authUser: null,
        allUsers: [],
      };
    case UserActionTypes.SIGNOUT_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        authError: action.err.message,
      };
    case UserActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        authUser: action.payload,
      };
    case UserActionTypes.GET_ALL_USER_SUCCESS:
      return {
        ...state,
        allUsers: action.payload.users,
        subscriptionUsers: action.payload.paidUsers,
      };
    case UserActionTypes.GET_ALL_SWIPE_USER_SUCCESS:
      return {
        ...state,
        allUsers: action.payload.allUsers,
        swipeUsers: action.payload.swipes,
      };
    case UserActionTypes.GET_ALL_MATCH_USER_SUCCESS:
      return {
        ...state,
        allUsers: action.payload.allUsers,
        matchUsers: action.payload.matches,
      };
    case UserActionTypes.GET_ALL_SEEKER_REQUEST_SUCCESS:
      return {
        ...state,
        allUsers: action.payload.allUsers,
        seekerRequests: action.payload.seekers,
      };
    default:
      return state;
  }
};

export default authReducer;
