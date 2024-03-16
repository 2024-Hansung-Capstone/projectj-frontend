import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://52.79.239.157:5000/graphql',
  cache: new InMemoryCache(),
});

export default client;