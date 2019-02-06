import React from 'react';

import Repositories from '../Repositories';
import { GET_REPOSITORIES_OF_CURRENT_USER } from './operations/queries';

const Profile = () => (
  <Repositories
    query={GET_REPOSITORIES_OF_CURRENT_USER}
    variables={{ repositoryCount: 3 }}
    entry="viewer"
  />
);

export default Profile;
