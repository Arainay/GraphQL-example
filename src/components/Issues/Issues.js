import React from 'react';
import { Query } from 'react-apollo';

import ErrorMessage from '../ErrorMessage';
import Loading from '../Loading';
import Issue from '../Issue';

import { GET_ISSUES_OF_REPOSITORY } from './operations/queries';

const Issues = ({ repositoryOwner, repositoryName }) => {
  return (
    <Query
      query={GET_ISSUES_OF_REPOSITORY}
      variables={{ repositoryOwner, repositoryName }}
    >
      {({ data, loading, error, fetchMore }) => {
        if (error) {
          return <ErrorMessage message={error.message}/>
        }

        const { repository } = data;

        if (loading && !repository) {
          return <Loading/>
        }

        if (repository.issues.edges.length === 0) {
          return <h3>No issues</h3>
        }

        return (
          <div className="issues">
            {repository.issues.edges.map(({ node }) => (
              <Issue {...node} key={node.id}/>
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default Issues;