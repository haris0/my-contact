import { useContactDetail } from '@/modules/contact-detail/contactDetailHooks';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Avatar, Button, Card, CardBody, Spinner, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
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
            padding={2}
            alignItems='flex-end'
          >
            <Button size='xs' width='fit-content'>
              <EditIcon />
            </Button>
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
              <Button
                marginTop={12}
                leftIcon={<DeleteIcon />}
                colorScheme='red'
                variant='ghost'
                width='fit-content'
                alignSelf='center'
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        </Stack>
      )}
      {!loading && !data?.contact_by_pk && (
        <Stack width='full' alignItems='center' paddingY={14} spacing={6}>
          <Image
            src='/images/page-not-found.png' 
            alt='user not found'
            width={150}
            height={100}
          />
          <Text>User Not Found</Text>
        </Stack>
      )}
    </Stack>
  );
};
