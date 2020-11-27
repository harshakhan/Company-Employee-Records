import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../LandingPages/LoginPage';
import RegisterPage from '../LandingPages/RegisterPage';
import PrivateRoutes from './PrivateRoutes';

const Routes = () => {
  return (
    <Switch>
      <Route path='/login' component={LoginPage} />
      <Route path='/register' component={RegisterPage} />
      <PrivateRoutes />
    </Switch>
  )
}

export default Routes;