import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const WHO_AM_I_QUERY = gql`
  query WhoAmI {
    whoAmI {
      id
      email
      name
      birth_at
      mbti
      phone_number
      dong {
        id
      }
    }
  }
`;