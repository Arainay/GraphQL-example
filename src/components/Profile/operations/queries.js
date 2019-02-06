import gql from 'graphql-tag';

import { USER_FRAGMENT } from './fragments';
import { REPOSITORY_FRAGMENT } from '../../Repository/operations/fragments';

export const GET_CURRENT_USER = gql`
  query User {
    viewer {
      ...user
    }
  }
  
  ${USER_FRAGMENT}
`;

export const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  query UserAndRepositories($repositoryCount: Int = 5, $cursor: String) {
    viewer {
      ...user
      repositories(
        first: $repositoryCount
        orderBy: { direction: DESC, field: STARGAZERS }
        after: $cursor
      ) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
  ${USER_FRAGMENT}
`;