import React from 'react';

import Repositories from '../Repositories';
import { GET_REPOSITORIES_OF_ORGANIZATION } from './operations/queries';

const Organization = () => {
  return (
    <Repositories
      query={GET_REPOSITORIES_OF_ORGANIZATION}
      variables={{ organizationName: 'the-road-to-learn-react', repositoryCount: 3 }}
      entry="organization"
    />
  );
};

export default Organization;