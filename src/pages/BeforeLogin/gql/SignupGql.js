import { gql } from "@apollo/client";

const SIGN_UP = gql`
  mutation SignUp($createUserInput: CreateUserInput!, $phone_number: String!, $token: String!) {
    signUp(createUserInput: $createUserInput) {
      id
      dong
      email
      name
      gender
      birth_at
      mbti
      phone_number
      is_find_mate
      point
      create_at
    }
  }
`;

export default SIGN_UP;
