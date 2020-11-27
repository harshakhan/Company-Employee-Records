import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import HomePage from '../LandingPages/HomePage';
import StudentPage from '../LandingPages/StudentPage';

const PrivateRoutes = () => {
  const { auth } = useSelector(state => state.auth)
  if (!auth) return <Redirect to='/login' />
  return (
    <>
      <Route path='/' exact={true} component={HomePage} />
      <Route path='/:id' exact={true} component={StudentPage} />
    </>
  )
}

export default PrivateRoutes;