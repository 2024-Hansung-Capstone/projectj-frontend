import { gql } from "@apollo/client";

const ADD_PRODICT = gql`
  mutation AddProduct {
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

export default ADD_PRODICT;

  