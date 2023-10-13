import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './scss/style.scss';
import {connect} from 'react-redux';
import {authObserver} from './actions/userAction';
import PrivateRoute from './privateRoute';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

// Home
const Home = React.lazy (() => import ('./Home'));

// Containers
const TheLayout = React.lazy (() => import ('./containers/TheLayout'));

// Pages
const Login = React.lazy (() => import ('./views/pages/login/Login'));
const Register = React.lazy (() => import ('./views/pages/register/Register'));
const Page404 = React.lazy (() => import ('./views/pages/page404/Page404'));
const Page500 = React.lazy (() => import ('./views/pages/page500/Page500'));

const App = props => {
  useEffect (() => {
    // subscribe to the auth observer
    const unsubscribe = props.authObserver ();
    // unsubscribe
    return unsubscribe;
  });

  return (
    <React.Fragment>
      <Router>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signin" component={Login} />
            <Route path="/signup" component={Register} />
            <Route
              exact
              path="/404"
              name="Page 404"
              render={props => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={props => <Page500 {...props} />}
            />
            <PrivateRoute path="/dashboard" component={TheLayout} />
            <PrivateRoute path="/users" component={TheLayout} />
            <PrivateRoute path="/swiped_users" component={TheLayout} />
            <PrivateRoute path="/subscriptions" component={TheLayout} />
            <PrivateRoute path="/reported_users" component={TheLayout} />
            <PrivateRoute path="/user_profile" component={TheLayout} />
            <PrivateRoute path="/matchusers" component={TheLayout} />
            <PrivateRoute path="/seekerrequests" component={TheLayout} />
            <PrivateRoute path="/schedulemeeting" component={TheLayout} />
          </Switch>
        </React.Suspense>
      </Router>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    authObserver: () => dispatch (authObserver ()),
  };
};

export default connect (null, mapDispatchToProps) (App);
