import React, { Fragment, useState } from 'react';
import { Query } from 'react-apollo';

import ErrorMessage from '../ErrorMessage';
import Loading from '../Loading';
import Issue from '../Issue';
import IssuesButtons from './IssuesButtons';

import { GET_ISSUES_OF_REPOSITORY } from './operations/queries';

import { ISSUE_STATES } from './constants';

const isShow = issueState => issueState !== ISSUE_STATES.NONE;

const Issues = ({ repositoryOwner, repositoryName }) => {
  const [issueState, setIssueState] = useState(ISSUE_STATES.NONE);

  const handleClick = (type) => () => {
    setIssueState(type);
  };

  if (!isShow(issueState)) {
    return <IssuesButtons onClick={handleClick} issueState={issueState}/>;
  }

  return (
    <Fragment>
      <IssuesButtons onClick={handleClick} issueState={issueState}/>
      <Query
        query={GET_ISSUES_OF_REPOSITORY}
        variables={{ repositoryOwner, repositoryName }}
      >
        {({ data, loading, error }) => {
          if (error) {
            return <ErrorMessage message={error.message}/>
          }

          const { repository } = data;

          if (loading && !repository) {
            return <Loading/>
          }

          const filteredRepository = {
            issues: {
              edges: repository.issues.edges.filter(item => item.node.state === issueState)
            }
          };

          if (filteredRepository.issues.edges.length === 0) {
            return <h3>No issues</h3>
          }

          return (
            <div className="issues">
              {filteredRepository.issues.edges.map(({ node }) => (
                <Issue {...node} key={node.id}/>
              ))}
            </div>
          );
        }}
      </Query>
    </Fragment>
  );
};

export default Issues;