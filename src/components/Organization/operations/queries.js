import gql from 'graphql-tag';

import { REPOSITORY_FRAGMENT } from '../../Repository/operations/fragments';
import { ORGANIZATION_FRAGMENT } from './fragments';

export const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  query OrganizationRepositories(
    $organizationName: String!,
    $repositoryCount: Int = 5,
    $cursor: String
  ) {
    organization(login: $organizationName) {
      ...organization
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
  ${ORGANIZATION_FRAGMENT}
`;