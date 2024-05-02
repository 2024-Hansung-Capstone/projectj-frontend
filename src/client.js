import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://13.209.3.204:5000/graphql:',
  cache: new InMemoryCache(),
});

export default client;