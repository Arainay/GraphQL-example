import React from 'react';
import { render } from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import GITHUB_TOKEN from './token';
import App from './components/App';

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${GITHUB_TOKEN}`
  }
});

const errorLink = onError(({ graphQLErrors, networkErrors }) => {
  if (graphQLErrors) {
    // do something with graphql error
  }
  if (networkErrors) {
    // do something with network error
  }
});

const link = ApolloLink.from([errorLink, httpLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
