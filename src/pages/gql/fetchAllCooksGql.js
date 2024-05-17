import { gql } from '@apollo/client';

export const FETCH_ALL_COOKS = gql`
  query FetchAllCooks {
    fetchAllCooks {
      id
      name
      author
      detail
      view
      create_at
      post_images {
        id
        url
      }
    }
  }
`;