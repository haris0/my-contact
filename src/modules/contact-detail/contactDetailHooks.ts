import { QueryHookOptions, useQuery } from "@apollo/client"
import { ContactDetail } from "./contactDetailEntity";
import { GET_CONTACT_DETAIL } from "./contactDetailQuery";

type ContactDetailVariabels = {
  id: number;
}

export const useContactDetail = (variables: ContactDetailVariabels, option: QueryHookOptions) => {
  return useQuery<ContactDetail>(GET_CONTACT_DETAIL, {
    variables,
    ...option
  });
}
