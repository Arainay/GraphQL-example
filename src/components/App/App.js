import React, { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import Loading from '../Loading';

import * as ROUTES from '../../constants/routes';

const Organization = lazy(() => import('../Organization'));
const Profile = lazy(() => import('../Profile'));
const OrganizationSuspenseContainer = () => (
  <Suspense fallback={<Loading/>}>
    <Organization/>
  </Suspense>
);
const ProfileSuspenseContainer = () => (
  <Suspense fallback={<Loading/>}>
    <Profile/>
  </Suspense>
);

const App = () => (
  <BrowserRouter>
    <Fragment>
      <Navigation/>
      <Route
        exact
        path={ROUTES.ORGANIZATION}
        component={OrganizationSuspenseContainer}
      />
      <Route
        exact
        path={ROUTES.PROFILE}
        component={ProfileSuspenseContainer}
      />
    </Fragment>
  </BrowserRouter>
);

export default App;
