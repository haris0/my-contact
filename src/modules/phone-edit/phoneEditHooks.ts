import { MutationHookOptions, useMutation } from "@apollo/client";
import { Contact } from "../contact-list/contactListEntity";
import { EDIT_PHONE_CONTACT } from "./phoneEditQuery";

type EditPhoneContactVariabels = {
  id: number;
  phone: string;
  newPhone: string
}

export const useEditPhoneContact = (option?: MutationHookOptions) => {
  const [mutation, { data, loading, error }] = useMutation<Contact>(EDIT_PHONE_CONTACT, {...option});

  const editPhoneContact = (variables: EditPhoneContactVariabels) => {
    return mutation({ variables: {
      pk_columns: {
        contact_id: variables.id,
        number: variables.phone,
      },
      new_phone_number: variables.newPhone
    }});
  }

  return {
    editPhoneContact,
    data,
    loading,
    error
  }
}
