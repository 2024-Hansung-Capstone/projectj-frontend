// MyComponent.js 파일

import React from 'react';
import { useQuery, gql } from '@apollo/client';

const FETCH_USER = gql`
  query {
    fetchUser {
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

function MyComponent() {
  const { loading, error, data } = useQuery(FETCH_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.fetchUser;

  return (
    <div>
      <h1>User Details</h1>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      {/* 여기에 다른 사용자 정보를 표시 */}
    </div>
  );
}

export default MyComponent;
