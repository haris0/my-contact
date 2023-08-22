import { MutationHookOptions, useMutation } from "@apollo/client";
import { Contact, Phone } from "../contact-list/contactListEntity";
import { ADD_CONTACT } from "./contactAddQuery";

type AddContactVariabels = {
  firstName: string;
  lastName: string;
  phones: Phone[];
}

export const useAddContact = (option?: MutationHookOptions) => {
  const [mutation, { data, loading, error }] = useMutation<Contact>(ADD_CONTACT, {...option});

  const addContact = (variables: AddContactVariabels) => {
    return mutation({ variables: { 
      first_name: variables.firstName,
      last_name : variables.lastName,
      phones: variables.phones
    }});
  }

  return {
    addContact,
    data,
    loading,
    error
  }
}
