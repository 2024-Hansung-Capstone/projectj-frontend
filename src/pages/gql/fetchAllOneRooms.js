// Query.fetchOneRooms: [OneRoom!]!
import { gql } from '@apollo/client';

const FETCH_ALL_ONE_ROOMS = gql`
  query FetchAllOneRooms {
    fetchOneRooms {
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

export default FETCH_ALL_ONE_ROOMS;