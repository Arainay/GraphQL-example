import React, { Fragment } from 'react';
import { Query } from 'react-apollo';

import { GET_REPOSITORIES_OF_CURRENT_USER } from './operations/queries';

import Repository from '../Repository/';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';

const Repositories = () => (
  <Query
    query={GET_REPOSITORIES_OF_CURRENT_USER}
    variables={{ repositoryCount: 3 }}
  >
    {({ data, loading, error }) => {
      if (error) {
        return <ErrorMessage message={error.message}/>;
      }

      const { viewer } = data;

      if (loading || !viewer) {
        return <Loading/>;
      }

      const { login, name, repositories } = viewer;

      return (
        <Fragment>
          <h3 className="user-info">
            {name} - {login}
          </h3>
          <div className="repositories">
            {repositories.edges.map(({ node }) => (
              <Repository {...node} key={node.id}/>
            ))}
          </div>
        </Fragment>
      );
    }}
    </Query>
);

export default Repositories;