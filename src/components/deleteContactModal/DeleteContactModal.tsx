import { Contact } from "@/modules/contact-list/contactListEntity";
import { DeleteIcon } from "@chakra-ui/icons";
import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter, 
  Button,
  Text
} from "@chakra-ui/react";

type DeleteContactModalProps = {
  isOpen: boolean;
  contact?: Contact;
  isDeleting?: boolean;
  onClose: () => void;
  onDelete?: (id: number) => void; 
}

export const DeleteContactModal = (props: DeleteContactModalProps) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Contact</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure want to delete contact:{' '}
          <Text as='b'>
            {props.contact?.first_name} {props.contact?.last_name}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            leftIcon={<DeleteIcon />}
            colorScheme='red'
            isLoading={props.isDeleting}
            onClick={() => props.onDelete?.(props.contact?.id || 0)}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
