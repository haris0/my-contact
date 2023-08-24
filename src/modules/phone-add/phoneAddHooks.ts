import { MutationHookOptions, useMutation } from "@apollo/client";
import { Contact } from "../contact-list/contactListEntity";
import { ADD_PHONE_CONTACT } from "./phoneAddQuery";

type AddPhoneContactVariabels = {
  id: number;
  phone: string;
}

export const useAddPhoneContact = (option?: MutationHookOptions) => {
  const [mutation, { data, loading, error }] = useMutation<Contact>(ADD_PHONE_CONTACT, {...option});

  const addPhoneContact = (variables: AddPhoneContactVariabels) => {
    return mutation({ variables: {
      contact_id: variables.id,
      phone_number: variables.phone
    }});
  }

  return {
    addPhoneContact,
    data,
    loading,
    error
  }
}
