import gql from 'graphql-tag';

export const GET_ISSUES_OF_REPOSITORY = gql`
  query Issues($repositoryOwner: String!, $repositoryName: String!, $issueState: IssueState!) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issues(first: 5, states: [$issueState]) {
        edges {
          node {
            id
            number
            state
            title
            url
            bodyHTML
          }
        }
      }
    }
  }
`;