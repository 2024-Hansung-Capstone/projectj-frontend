// FetchOneRoomFromOpenAPI.js
import { gql } from '@apollo/client';

const FETCH_ONE_ROOM_FROM_OPEN_API = gql`
  mutation FetchOneRoomFromOpenAPI($LAWD_CD: String!) {
    fetchOneRoomFromOpenAPI(LAWD_CD: $LAWD_CD)
  }
`;

export default FETCH_ONE_ROOM_FROM_OPEN_API;
