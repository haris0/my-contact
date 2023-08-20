import { ContactCard } from '@/components/contactCard/ContactCard';
import { useContactList } from '@/modules/contact-list/contactListHooks';
import { Spinner, Stack } from '@chakra-ui/react';
import Link from 'next/link';

export const ContactLisScreen = () => {
  const { loading, data } = useContactList({
    limit: 10,
    offset: 1
  });
  
  return (
    <Stack>
      {loading && (
        <Stack alignItems='center' marginTop={8}>
          <Spinner size='lg' thickness='3px' />
        </Stack>
      )}
      {!loading && (data?.contact.length || 0) > 0 && (
        <Stack marginTop={4} padding={4}>
          {data?.contact.map((cont) => (
            <Link key={cont.id} href={`/contact/${cont.id}`}>
              <ContactCard
                firstName={cont.first_name}
                lastName={cont.last_name}
                phoneNumber={cont.phones?.[0]?.number || ''}
              />
            </Link>
          ))}
        </Stack>
      )}
    </Stack>
  );
};
