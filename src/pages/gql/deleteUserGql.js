import { gql } from '@apollo/client';

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser {
    deleteUser
  }
`;

export default DELETE_USER_MUTATION;