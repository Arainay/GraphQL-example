import React, { Fragment, useState } from 'react';

import Repositories from '../Repositories';
import OrganizationSearch from '../OrganizationSearch';

import { GET_REPOSITORIES_OF_ORGANIZATION } from './operations/queries';

const Organization = () => {
  const [organizationName, setOrganizationName] = useState('the-road-to-learn-react');

  return (
    <Fragment>
      <OrganizationSearch
        organizationName={organizationName}
        setOrganizationName={setOrganizationName}
      />
      <Repositories
        query={GET_REPOSITORIES_OF_ORGANIZATION}
        variables={{ organizationName, repositoryCount: 3 }}
        entry="organization"
      />
    </Fragment>
  );
};

export default Organization;