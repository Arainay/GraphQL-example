import React, { Fragment, lazy } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navigation from '../Navigation';
// import Profile from '../Profile';
// import Organization from '../Organization';

import * as ROUTES from '../../constants/routes';

const Organization = lazy(() => import('../Organization'));
const Profile = lazy(() => import('../Profile'));

const App = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Navigation/>
        <Route
          exact
          path={ROUTES.ORGANIZATION}
          component={Organization}
        />
        <Route
          exact
          path={ROUTES.PROFILE}
          component={Profile}
        />
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
