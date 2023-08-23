import { QueryHookOptions, useQuery } from "@apollo/client"
import { Contacts } from "./contactListEntity";
import { GET_CONTACT_LIST } from "./contactListQuery";

type ContactListVariabels = {
  limit: number;
  offset: number;
  where?: any;
  order_by?: any;
}

export const useContactList = (variables: ContactListVariabels, option?: QueryHookOptions) => {
  return useQuery<Contacts>(GET_CONTACT_LIST, {
    variables,
    ...option
  });
}
