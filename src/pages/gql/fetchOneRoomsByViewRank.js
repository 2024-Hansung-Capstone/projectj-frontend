import { gql } from '@apollo/client';

export const FETCH_TOP_THREE_POPULAR_ROOMS = gql`
  query FetchTopThreePopularRooms($rank: Float!) {
    fetchOneRoomsByViewRank(rank: $rank) {
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
