import { DeleteContactModal } from '@/components/deleteContactModal/DeleteContactModal';
import { HeaderWithAva } from '@/components/headerWithAva/HeaderWithAva';
import { UserNotFound } from '@/components/userNotFound/UserNotFound';
import { useDeleteContact } from '@/modules/contact-delete/contactDeleteHooks';
import { useContactDetail } from '@/modules/contact-detail/contactDetailHooks';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button, Card, CardBody, Spinner, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export const ContactDetailScreen = () => {
  const { query, ...router } = useRouter();
  const toast = useToast();
  const deleteModal = useDisclosure();

  const { data, loading } = useContactDetail(
    {
      id: Number(query?.contactId)
    },
    {
      skip: !query?.contactId
    },
  );

  const { deleteContact, loading: deleting } = useDeleteContact({
    onCompleted(data) {
      toast({
        title: `Success Delete ${data.delete_contact_by_pk.first_name} ${data.delete_contact_by_pk.last_name}`,
        status: 'success',
        isClosable: true,
      });
      deleteModal.onClose();
      router.replace('/');
    },
    onError(error) {
      toast({
        title: error.message,
        status: 'error',
        isClosable: true,
      });
      deleteModal.onClose();
    },
  });

  return (
    <Stack>
      {loading && (
        <Stack alignItems='center' marginTop={8}>
          <Spinner size='lg' thickness='3px' />
        </Stack>
      )}
      {!loading && data?.contact_by_pk && (
        <Stack>
          <HeaderWithAva name={data.contact_by_pk.first_name+" "+data.contact_by_pk?.last_name}>
            <Link href={`/contact/${data.contact_by_pk.id}/edit`}>
              <Button size='xs' width='fit-content'>
                <EditIcon />
              </Button>
            </Link>
          </HeaderWithAva>
          <Stack width='full'>
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
                isLoading={deleting}
                onClick={() => deleteModal.onOpen()}
              >
                Delete
              </Button>
            </Stack>
          </Stack>
          <DeleteContactModal 
            isOpen={deleteModal.isOpen}
            contact={data.contact_by_pk}
            isDeleting={deleting}
            onClose={deleteModal.onClose}
            onDelete={(id) => deleteContact({ id })}
          />
        </Stack>
      )}
      {!loading && !data?.contact_by_pk && (
        <UserNotFound />
      )}
    </Stack>
  );
};
