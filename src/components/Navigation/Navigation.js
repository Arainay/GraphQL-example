import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const Navigation = () => {
  return (
    <header className="navigation">
      <Link to={ROUTES.ORGANIZATION}>Organization</Link>
      <Link to={ROUTES.PROFILE}>Profile</Link>
    </header>
  );
};

export default Navigation;