import gql from 'graphql-tag';

import { USER_FRAGMENT } from './fragments';

export const GET_CURRENT_USER = gql`
  query User {
    viewer {
      ...user
    }
  }
  
  ${USER_FRAGMENT}
`;