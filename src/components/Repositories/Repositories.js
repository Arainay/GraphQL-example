import React, { Fragment } from 'react';
import { Query } from 'react-apollo';

import Repository from '../Repository/';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import FetchMore from '../FetchMore';

const updateQuery = (entry) => (prevResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return prevResult;
  }

  return {
    ...prevResult,
    [entry]: {
      ...prevResult[entry],
      repositories: {
        ...prevResult[entry].repositories,
        ...fetchMoreResult[entry].repositories,
        edges: [
          ...prevResult[entry].repositories.edges,
          ...fetchMoreResult[entry].repositories.edges,
        ]
      }
    }
  };
};

const Repositories = ({ query, variables, entry }) => (
  <Query
    query={query}
    notifyOnNetworkStatusChange
    variables={variables}
  >
    {({ data, loading, error, fetchMore }) => {
      if (error) {
        return <ErrorMessage message={error.message}/>;
      }

      if (loading && !data[entry]) {
        return <Loading/>;
      }

      const { login, name, repositories } = data[entry];

      return (
        <Fragment>
          <h3 className="user-info">
            {name} - {login}
          </h3>
          <div className="repositories">
            {repositories.edges.map(({ node }) => (
              <Repository {...node} key={node.id}/>
            ))}
            <FetchMore
              hasNextPage={repositories.pageInfo.hasNextPage}
              fetchMore={fetchMore}
              variables={{
                cursor: repositories.pageInfo.endCursor
              }}
              updateQuery={updateQuery(entry)}
              loading={loading}
            >
              More Repositories
            </FetchMore>
          </div>
        </Fragment>
      );
    }}
    </Query>
);

export default Repositories;