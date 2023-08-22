import { ContactCard } from '@/components/contactCard/ContactCard';
import { DeleteContactModal } from '@/components/deleteContactModal/DeleteContactModal';
import { Pagination } from '@/components/pagination/Pagination';
import { Contact } from '@/modules/contact-list/contactListEntity';
import { useContactList } from '@/modules/contact-list/contactListHooks';
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
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const ContactLisScreen = () => {
  const router = useRouter();
  
  const [currectPage, setCurrectPage] = useState(0);
  const [selectedContact, setSelectedContact] = useState<Contact>();
  const [keyword, setKeyword] = useState('');
  const deleteModal = useDisclosure();

  const { loading, data } = useContactList({
    limit: 10,
    offset: currectPage,
    where: router.query.keyword ? {
      "_or": [
        {
          "first_name": {"_like": `%${router.query.keyword}%` }
        },
        {
          "last_name": {"_like": `%${router.query.keyword}%` }
        }
      ]
    } : undefined,
    order_by: [
      {
        "first_name": "asc"
      }
    ]
  });

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
      setCurrectPage(0)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.page]);

  useEffect(() => {
    if(router.query.keyword) {
      setKeyword(String(router.query.keyword));
    }
  }, [router.query.keyword]);
  
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
      {!loading && (data?.contact.length || 0) > 0 && (
        <Stack paddingX={4} paddingBottom={3}>
          <Stack marginTop={2}>
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
        </Stack>
      )}
      <Pagination 
        currectPage={currectPage}
        dataLength={data?.contact.length || 0}
        onPrev={() => router.push({
          pathname: '/',
          query: {
            ...router.query,
            page: currectPage - 1
          }
        })}
        onNext={() => router.push({
          pathname: '/',
          query: {
            ...router.query,
            page: currectPage + 1
          }
        })}
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
        onClose={deleteModal.onClose}
        contact={selectedContact}
      />
    </Stack>
  );
};
