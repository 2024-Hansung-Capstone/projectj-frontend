import { gql } from '@apollo/client';

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      profile_image {
        imagePath
      }
      email
      name
      gender
      birth_at
      mbti
      phone_number
      is_find_mate
      point
      create_at
      dong {
        name
      }
    }
  }
`;
