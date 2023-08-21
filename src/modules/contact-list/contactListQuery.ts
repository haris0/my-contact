import { gql } from "@apollo/client";

export const GET_CONTACT_LIST = gql`
  query GetContactList (
    $limit: Int, 
    $offset: Int,
    $where: contact_bool_exp
  ) {
    contact(
      limit: $limit, 
      offset: $offset,
      where: $where
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
