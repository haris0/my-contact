import { MutationHookOptions, useMutation } from "@apollo/client"
import { ContactDetail } from "../contact-detail/contactDetailEntity";
import { Phone } from "../contact-list/contactListEntity";
import { ADD_CONTACT } from "./contactAddQuery";

type AddContactVariabels = {
  firstName: string;
  lastName: string;
  phones: Phone[];
}

export const useAddContact = (option?: MutationHookOptions) => {
  const [mutation, { data, loading, error }] = useMutation<ContactDetail>(ADD_CONTACT, {...option});

  const addContact = (variable: AddContactVariabels) => {
    return mutation({ variables: { 
      first_name: variable.firstName,
      last_name : variable.lastName,
      phones: variable.phones
    }});
  }

  return {
    addContact,
    data,
    loading,
    error
  }
}
