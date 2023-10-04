import React from 'react';

const Dashboard = React.lazy (() => import ('./views/dashboard/Dashboard'));
const Users = React.lazy (() => import ('./views/users/Users'));
const User = React.lazy (() => import ('./views/users/User'));
const MyProfile = React.lazy (() => import ('./views/users/MyProfile'));
const ReportedUsers = React.lazy (() =>
  import ('./views/reported_users/ReportedUsers')
);
const SwipedUsers = React.lazy (() =>
  import ('./views/swiped_users/SwipedUsers')
);
const SubscriptionUsers = React.lazy (() =>
  import ('./views/subscriptions/SubscriptionUsers')
);
const SeekerRequests = React.lazy (() =>
  import ('./views/seekers/SeekerRequests')
);
const ScheduleMeeting = React.lazy (() =>
  import ('./views/schedule_meeting/schedulemeeting')
);
const MatchUsers = React.lazy (() => import ('./views/matches/MatchUsers'));

const routes = [
  {path: '/', exact: true, name: 'Home'},
  {path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard},
  {path: '/users', exact: true, name: 'Users', component: Users},
  {
    path: '/user_profile',
    exact: true,
    name: 'User Profile',
    component: MyProfile,
  },
  {path: '/users/:id', exact: true, name: 'User Details', component: User},
  {
    path: '/reported_users',
    exact: true,
    name: 'Reported Users',
    component: ReportedUsers,
  },
  {
    path: '/swiped_users',
    exact: true,
    name: 'Swiped Users',
    component: SwipedUsers,
  },
  {
    path: '/subscriptions',
    exact: true,
    name: 'Subscription Users',
    component: SubscriptionUsers,
  },
  {
    path: '/matchusers',
    exact: true,
    name: 'Subscription Users',
    component: MatchUsers,
  },
  {
    path: '/seekerrequests',
    exact: true,
    name: 'Seeker Requests',
    component: SeekerRequests,
  },
  {
    path: '/schedulemeeting',
    exact: true,
    name: 'Schedule Meeting',
    component: ScheduleMeeting,
  },
];

export default routes;
