import gql from 'graphql-tag';

export const ORGANIZATION_FRAGMENT = gql`
  fragment organization on Organization {
    login
    name
  }
`;