import { gql } from '@apollo/client';

export const FETCH_ONE_ROOM_BY_ID = gql`
  query fetchOneRoomById($id: String!) {
    fetchOneRoomById(id: $id) {
      id
      jibun
      monthly_rent
      area_exclusiveUse
      name
      dong
      is_monthly_rent
      deposit
      view
    }
  }
`;
