import { gql } from "@apollo/client";

export const GET_CONTACT_LIST = gql`
  query GetContactList (
    $limit: Int, 
    $offset: Int,
  ) {
    contact(
      limit: $limit, 
      offset: $offset,
    ){
      created_at
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;
