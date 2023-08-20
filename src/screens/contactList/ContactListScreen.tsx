import { useContactList } from '@/modules/contact-list/contactListHooks';
import { Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

export const ContactLisScreen = () => {
  const { loading, data } = useContactList({
    limit: 10,
    offset: 1
  });
  
  return (
    <Stack alignItems='center'>
      <Stack maxWidth={720} width='full'>
        <Stack alignItems='center' marginTop={4}>
          <Link href='/'>
            <Image 
              src='/images/my-contact.png' 
              alt='Cake Story'
              width={150}
              height={100}
            />
          </Link>
        </Stack>
        {loading && (
          <Text>Load Contact...</Text>
        )}
        {!loading && (data?.contact.length || 0) > 0 && (
          <Stack>
            {data?.contact.map((cont) => (
              <Text key={cont.id}>{cont.first_name} {cont.last_name}</Text>
            ))}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
