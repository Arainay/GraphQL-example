import gql from 'graphql-tag';

import { REPOSITORY_FRAGMENT } from '../../Repository/operations/fragments';
import { USER_FRAGMENT } from '../../Profile/operations/fragments';

export const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  query UserAndRepositoris($repositoryCount: Int = 5, $cursor: String) {
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