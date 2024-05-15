import { gql } from '@apollo/client';

export const FETCH_ONE_ROOM_BY_XY = gql`
  query fetchOneRoomByXY($StartX: Float!, $StartY: Float!, $EndX: Float!, $EndY: Float!) {
    fetchOneRoomByXY(StartX: $StartX, StartY: $StartY, EndX: $EndX, EndY: $EndY) {
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