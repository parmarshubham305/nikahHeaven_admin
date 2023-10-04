import React from 'react';
import {
  IoIosSwitch,
  GiMatchHead,
  FaHome,
  FaUser,
  MdReport,
  ImFinder,
  MdPayment,
  MdSchedule,
} from 'react-icons/all';

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <FaHome size={20} style={{marginRight: 15}} />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Users',
    to: '/users',
    icon: <FaUser size={20} style={{marginRight: 15}} />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Swiped Users',
    to: '/swiped_users',
    icon: <IoIosSwitch size={20} style={{marginRight: 15}} />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Match Users',
    to: '/matchusers',
    icon: <GiMatchHead size={20} style={{marginRight: 15}} />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Subscription Users',
    to: '/subscriptions',
    icon: <MdPayment size={20} style={{marginRight: 15}} />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Seeker Request',
    to: '/seekerrequests',
    icon: <ImFinder size={18} style={{marginRight: 15}} />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Schedule Meeting',
    to: '/schedulemeeting',
    icon: <MdSchedule size={18} style={{marginRight: 15}} />,
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Reported Users',
  //   to: '/reported_users',
  //   icon: <MdReport size={20} style={{marginRight: 15}} />,
  // },
];

export default _nav;
