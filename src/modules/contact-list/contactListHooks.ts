import { useQuery } from "@apollo/client"
import { Contacts } from "./contactListEntity";
import { GET_CONTACT_LIST } from "./contactListQuery";

type ContactListVariabels = {
  limit: number;
  offset: number;
}

export const useContactList = (variables: ContactListVariabels) => {
  return useQuery<Contacts>(GET_CONTACT_LIST, {
    variables,
  });
}
