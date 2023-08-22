import { MutationHookOptions, useMutation } from "@apollo/client";
import { DELETE_CONTACT } from "./contactDeleteQuery";

type DeleteContactVariabels = {
  id: number;
}

export const useDeleteContact = (option?: MutationHookOptions) => {
  const [mutation, { data, loading, error }] = useMutation(DELETE_CONTACT, {...option});

  const deleteContact = (variables: DeleteContactVariabels) => {
    return mutation({ variables });
  }

  return {
    deleteContact,
    data,
    loading,
    error
  }
}
