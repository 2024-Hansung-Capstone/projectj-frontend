import { gql } from "@apollo/client";

const GET_ALL_PRODUCTS = gql`
  mutation GetAllProduct {
    id
    user
    title
    view
    like
    price
    detail
    category
    state
    create_at
  }
`;

export default GET_ALL_PRODUCTS;