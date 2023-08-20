import { useContactDetail } from '@/modules/contact-detail/contactDetailHooks';
import { Avatar, Card, CardBody, Spinner, Stack, Text } from '@chakra-ui/react';
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
          <Stack
            width='full'
            height={24}
            backgroundColor='gray.700'
          >
          </Stack>
          <Stack marginTop={-14} width='full'>
            <Avatar 
              name={data.contact_by_pk.first_name+" "+data.contact_by_pk?.last_name}
              size='xl'
              alignSelf='center'
            />
            <Text alignSelf='center' fontSize='xl'>
              {data.contact_by_pk.first_name+" "+data.contact_by_pk?.last_name}
            </Text>
            <Stack padding={4}>
              <Text>Phone Numbers:</Text>
              {data.contact_by_pk.phones.map((phone) => (
                <Card key={phone.number}>
                  <CardBody>{phone.number}</CardBody>
                </Card>
              ))}
            </Stack>
          </Stack>
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
