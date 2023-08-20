import { ContactCard } from '@/components/contactCard/ContactCard';
import { DeleteContactModal } from '@/components/deleteContactModal/DeleteContactModal';
import { Contact } from '@/modules/contact-list/contactListEntity';
import { useContactList } from '@/modules/contact-list/contactListHooks';
import {
  Spinner, 
  Stack, 
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';

export const ContactLisScreen = () => {
  const { loading, data } = useContactList({
    limit: 10,
    offset: 1
  });
  const deleteModal = useDisclosure();
  const [selectedContact, setSelectedContact] = useState<Contact>();
  
  return (
    <Stack>
      {loading && (
        <Stack alignItems='center' marginTop={8}>
          <Spinner size='lg' thickness='3px' />
        </Stack>
      )}
      {!loading && (data?.contact.length || 0) > 0 && (
        <Stack marginTop={2} padding={4}>
          {data?.contact.map((cont) => (
            <Link key={cont.id} href={`/contact/${cont.id}`}>
              <ContactCard
                firstName={cont.first_name}
                lastName={cont.last_name}
                phoneNumber={cont.phones?.[0]?.number || ''}
                onRemove={() => {
                  setSelectedContact(cont);
                  deleteModal.onOpen();
                }}
              />
            </Link>
          ))}
        </Stack>
      )}
      <DeleteContactModal 
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        contact={selectedContact}
      />
    </Stack>
  );
};
