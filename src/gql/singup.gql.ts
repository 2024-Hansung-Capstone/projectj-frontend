import { gql } from "@apollo/client";

export const POST_USER = gql`
    mutation PostUser(
        $email: String!
        $password: String!
        $name: String!
    ) {
    postUser(
        email: $email
        password: $password
        name: $name
    ) {
        email
    }
  }
`;