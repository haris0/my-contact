import { MutationHookOptions, useMutation } from "@apollo/client";
import { Contact } from "../contact-list/contactListEntity";
import { EDIT_CONTACT } from "./contactEditQuery";

type EditContactVariabels = {
  id: number;
  firstName: string;
  lastName: string;
}

export const useEditContact = (option?: MutationHookOptions) => {
  const [mutation, { data, loading, error }] = useMutation<Contact>(EDIT_CONTACT, {...option});

  const editContact = (variables: EditContactVariabels) => {
    return mutation({ variables: { 
      id: variables.id, 
      _set: {
        first_name: variables.firstName,
        last_name: variables.lastName,
      }
    }});
  }

  return {
    editContact,
    data,
    loading,
    error
  }
}
