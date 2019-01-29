import React from 'react';
import { Query } from 'react-apollo';

import { GET_CURRENT_USER } from './operations/queries';

import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';

const Profile = () => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, error }) => {
      if (error) {
        return <ErrorMessage message={error.message}/>
      }

      const { viewer } = data;

      if (loading || !viewer) {
        return <Loading/>;
      }

      return <div>{viewer.name} {viewer.login}</div>
    }}
  </Query>
);

export default Profile;
