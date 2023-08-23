import { ContactCard } from '@/components/contactCard/ContactCard';
import ContactFavoriteWrap from '@/components/contactFavoriteWrap/ContactFavoriteWrap';
import { DeleteContactModal } from '@/components/deleteContactModal/DeleteContactModal';
import { Pagination } from '@/components/pagination/Pagination';
import { useDeleteContact } from '@/modules/contact-delete/contactDeleteHooks';
import { Contact } from '@/modules/contact-list/contactListEntity';
import { useContactList } from '@/modules/contact-list/contactListHooks';
import { useContactStore } from '@/modules/contact-store/contactStore';
import { useDebouncedEffect } from '@/shared/hooks';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner, 
  Stack, 
  useDisclosure,
  useToast,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CONTACT_LIMIT = 10;

export const ContactLisScreen = () => {
  const router = useRouter();
  const toast = useToast();
  const deleteModal = useDisclosure();
  
  const [currectPage, setCurrectPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState<Contact>();
  const [keyword, setKeyword] = useState('');

  const { 
    contactStore, 
    saveContactStore, 
    isFavoriteContact, 
    unSaveContact 
  } = useContactStore();

  const { loading, data, refetch } = useContactList({
    limit: CONTACT_LIMIT,
    offset: CONTACT_LIMIT * (currectPage - 1),
    where: router.query.keyword ? {
      "_or": [
        {
          "first_name": {"_ilike": `%${router.query.keyword}%` }
        },
        {
          "last_name": {"_ilike": `%${router.query.keyword}%` }
        }
      ]
    } : undefined,
    order_by: [
      {
        "first_name": "asc"
      }
    ]
  });

  const { deleteContact, loading: deleting } = useDeleteContact({
    onCompleted(data) {
      toast({
        title: `Success Delete ${data.delete_contact_by_pk.first_name} ${data.delete_contact_by_pk.last_name}`,
        status: 'success',
        isClosable: true,
      });
      deleteModal.onClose();
      refetch();
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

  const handleChangePage = (page: number) => {
    router.push({
      pathname: '/',
      query: {
        ...router.query,
        page,
      }
    })
  }

  useDebouncedEffect(() => {
    router.push({
      pathname: '/',
      query: keyword ? { keyword } : undefined,
    }, undefined, { shallow: true });

  }, [keyword], 500);

  useEffect(() => {
    if(router.query.page && Number(router.query.page) !== currectPage) {
      setCurrectPage(Number(router.query.page))
    } else {
      setCurrectPage(1)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.page]);

  useEffect(() => {
    if(router.query.keyword) {
      setKeyword(String(router.query.keyword));
    }
  }, [router.query.keyword]);

  useEffect(() => {
    refetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Stack>
      <Stack marginTop={1} padding={4}>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon color='gray.300' />
          </InputLeftElement>
          <Input
            type='text' 
            colorScheme='teal' 
            placeholder='Search Contact by Name'
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)} 
          />
        </InputGroup>
      </Stack>
      {loading && (data?.contact.length || 0) < 1 && (
        <Stack alignItems='center' marginTop={8}>
          <Spinner size='lg' thickness='3px' />
        </Stack>
      )}
      <Stack>
        <ContactFavoriteWrap contactLenght={contactStore.length}>
          {contactStore.length > 0 ? (
            <Stack marginTop={2}>
              {contactStore.map((cont) => (
                <Link key={cont.id} href={`/contact/${cont.id}`}>
                  <ContactCard
                    firstName={cont.first_name}
                    lastName={cont.last_name}
                    isFavorite
                    phoneNumber={cont.phones?.[0]?.number || ''}
                    onFavorite={() => saveContactStore(cont)}
                  />
                </Link>
              ))}
            </Stack>
          ) : (
            <Stack alignItems='center'>
              <Text>No Favorite Contact</Text>
            </Stack>
          )}
        </ContactFavoriteWrap>
      </Stack>
      {!loading && (data?.contact.length || 0) > 0 && (
        <Stack paddingX={4} paddingBottom={3}>
          <Stack marginTop={2}>
            {data?.contact.map((cont) => (
              <Link key={cont.id} href={`/contact/${cont.id}`}>
                <ContactCard
                  firstName={cont.first_name}
                  lastName={cont.last_name}
                  phoneNumber={cont.phones?.[0]?.number || ''}
                  isFavorite={isFavoriteContact(cont.id)}
                  onRemove={() => {
                    setSelectedContact(cont);
                    deleteModal.onOpen();
                  }}
                  onFavorite={() => saveContactStore(cont)}
                />
              </Link>
            ))}
          </Stack>
        </Stack>
      )}
      <Pagination 
        currectPage={currectPage}
        dataLength={data?.contact.length || 0}
        onPrev={() => handleChangePage(currectPage - 1)}
        onNext={() => handleChangePage(currectPage + 1)}
        limit={CONTACT_LIMIT}
      />
      <Stack
        position='fixed'
        right={{ base: 4, md: 12 }}
        bottom={{ base: 4, md: 12 }}
      >
        <Link href='/add'>
          <Button borderRadius='full' width={12} height={12}>
            <AddIcon />
          </Button>
        </Link>
      </Stack>
      <DeleteContactModal 
        isOpen={deleteModal.isOpen}
        contact={selectedContact}
        isDeleting={deleting}
        onClose={deleteModal.onClose}
        onDelete={(id) => {
          deleteContact({ id });
          unSaveContact(id);
        }}
      />
    </Stack>
  );
};
