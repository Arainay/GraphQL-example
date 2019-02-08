import React, { Fragment, useState } from 'react';
import { Query } from 'react-apollo';

import FetchMore from '../FetchMore';
import ErrorMessage from '../ErrorMessage';
import Loading from '../Loading';
import Issue from '../Issue';
import IssuesButtons from './IssuesButtons';

import { GET_ISSUES_OF_REPOSITORY } from './operations/queries';

import { ISSUE_STATES } from './constants';

const isShow = issueState => issueState !== ISSUE_STATES.NONE;

const updateQuery = (prevResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return prevResult;
  }

  return {
    ...prevResult,
    repository: {
      ...prevResult.repository,
      issues: {
        ...prevResult.repository.issues,
        ...fetchMoreResult.repository.issues,
        edges: [
          ...prevResult.repository.issues.edges,
          ...fetchMoreResult.repository.issues.edges
        ]
      }
    }
  };
};

const Issues = ({ repositoryOwner, repositoryName }) => {
  const [issueState, setIssueState] = useState(ISSUE_STATES.NONE);

  const handleClick = (type) => () => {
    setIssueState(type);
  };

  return (
    <Fragment>
      <IssuesButtons onClick={handleClick} issueState={issueState}/>
      {isShow(issueState) && (
        <Query
          query={GET_ISSUES_OF_REPOSITORY}
          variables={{ repositoryOwner, repositoryName, issueState }}
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
                <FetchMore
                  hasNextPage={repository.issues.pageInfo.hasNextPage}
                  fetchMore={fetchMore}
                  variables={{
                    cursor: repository.issues.pageInfo.endCursor
                  }}
                  updateQuery={updateQuery}
                  loading={loading}
                >
                  More Issues
                </FetchMore>
              </div>
            );
          }}
        </Query>
      )}
    </Fragment>
  );
};

export default Issues;