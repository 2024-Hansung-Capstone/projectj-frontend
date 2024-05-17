import { gql } from '@apollo/client';

export const SEARCH_COOK = gql`
  query SearchCook($keyword: String!) {
    searchCook(keyword: $keyword) {
      id
      name
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
