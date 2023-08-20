import { useContactDetail } from '@/modules/contact-detail/contactDetailHooks';
import { Spinner, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

export const ContactDetailScreen = () => {
  const { query } = useRouter();

  const { data, loading } = useContactDetail(
    {
      id: Number(query?.contactId)
    },
    {
      skip: !query?.contactId
    },
  )
  return (
    <Stack>
      {loading && (
        <Stack alignItems='center' marginTop={8}>
          <Spinner size='lg' thickness='3px' />
        </Stack>
      )}
      {!loading && data?.contact_by_pk && (
        <Stack>
          <Text>
            {data.contact_by_pk.first_name}
          </Text>
        </Stack>
      )}
      {!loading && !data?.contact_by_pk && (
        <Stack>
          <Text>Data Not Fond</Text>
        </Stack>
      )}
    </Stack>
  );
};
