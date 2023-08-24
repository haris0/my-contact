import { ContactForm } from '@/components/contactForm/ContactForm';
import { useContactDetail } from '@/modules/contact-detail/contactDetailHooks';
import { useEditContact } from '@/modules/contact-edit/contactEditHooks';
import { useContactList } from '@/modules/contact-list/contactListHooks';
import { containsSpecialChars } from '@/shared/utils';
import { Avatar, Spinner, Stack, useToast, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useEditPhoneContact } from '@/modules/phone-edit/phoneEditHooks';
import { useAddPhoneContact } from '@/modules/phone-add/phoneAddHooks';

const COUNRTY_CODE = '+62';

const ContactEditScreen = () => {
  const { query } = useRouter();
  const toast = useToast();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phones, setPhones] = useState<{
    key: number,
    value: string,
  }[]>([]);


  const { editContact, loading: loadingEditContact } = useEditContact({
    onError(error) {
      toast({
        title: error.message,
        status: 'error',
        isClosable: true,
      })
    },
  });

  const { editPhoneContact, loading: loadingEditPhone } = useEditPhoneContact({
    onError(error) {
      toast({
        title: error.message,
        status: 'error',
        isClosable: true,
      })
    },
  });

  const { addPhoneContact } = useAddPhoneContact({
    onError(error) {
      toast({
        title: error.message,
        status: 'error',
        isClosable: true,
      })
    },
  });

  const { data: contactDetail, loading: loadingContactDetail } = useContactDetail(
    {
      id: Number(query?.contactId)
    },
    {
      skip: !query?.contactId,
    },
  );

  const { refetch } = useContactList(
    {
      offset: 0,
      limit: 10,
      where: {
        "_and": [
          {
            "first_name": {"_eq": firstName }
          },
          {
            "last_name": {"_eq": lastName }
          }
        ]
      },
    },
    {
      skip: true,
    }
  )

  const handleEditContact = async () => {
    // Validate filled
    if(!firstName || !lastName || !phones?.[0].value) {
      toast({
        title: 'All fields must be filled',
        status: 'error',
        isClosable: true,
      })
      return;
    }

    // Validate special characters
    if(containsSpecialChars(`${firstName}${lastName}`)) {
      toast({
        title: 'Name should not contain special characters',
        status: 'error',
        isClosable: true,
      })
      return;
    }

    // Validate unique name
    const { data } = await refetch();
    const filteredContact = data.contact.filter((cont) => cont.id !== contactDetail?.contact_by_pk.id)
    if(filteredContact.length > 0) {
      toast({
        title: 'Name must be unique',
        status: 'error',
        isClosable: true,
      })
      return;
    }

    // Edit contact
    await editContact({
      id: contactDetail?.contact_by_pk.id || 0,
      firstName,
      lastName,
    })

    // Edit Phone
    const filteredPhone = phones.filter((phone) => phone.value)
    await Promise.all(filteredPhone.map((phone, index) => editPhoneContact({
      id: contactDetail?.contact_by_pk.id || 0,
      phone: contactDetail?.contact_by_pk?.phones?.[index].number || '',
      newPhone: COUNRTY_CODE+phone.value
    })));

    toast({
      title: 'Success Edit Contact',
      status: 'success',
      isClosable: true,
    })
  }

  const handleAddPhoneContact = async (phone: string) => {
    if(!phone) {
      toast({
        title: 'Current Field is Empty',
        status: 'warning',
        isClosable: true,
      })
      return;
    }
    setPhones((prev) => [
      ...prev,
      {
        key: (prev[prev.length -1].key || 0) + 1,
        value: '',
      }
    ]);

    const phoneWithCode = COUNRTY_CODE+phone;
    const phoneIdx = contactDetail?.contact_by_pk.phones.findIndex((p) => p.number === phoneWithCode) ?? -1;
    if(phoneIdx === -1) {
      await addPhoneContact({
        id: contactDetail?.contact_by_pk.id || 0,
        phone: phoneWithCode
      })
      refetch();
    }
  }

  useEffect(() => {
    if(contactDetail && !firstName && !lastName) {
      setFirstName(contactDetail.contact_by_pk?.first_name)
      setLastName(contactDetail.contact_by_pk?.last_name)
      setPhones(contactDetail.contact_by_pk?.phones.map((phone, index) => ({
        key: index,
        value: phone.number.split('+62')[1] || phone.number.split('+62')[0],
      })))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactDetail]);

  return (
    <Stack>
      {loadingContactDetail && (
        <Stack alignItems='center' marginTop={8}>
          <Spinner size='lg' thickness='3px' />
        </Stack>
      )}
      {!loadingContactDetail && contactDetail?.contact_by_pk && (
        <Stack>
          <Stack
            width='full'
            height={24}
            backgroundColor='gray.700'
            padding={2}
            alignItems='flex-end'
          />
          <Stack marginTop={-14} width='full'>
            <Avatar 
              name={(firstName || lastName) ? firstName+" "+lastName : undefined}
              size='xl'
              alignSelf='center'
            />
          </Stack>
          <Stack marginTop={4}>
            <ContactForm 
              type='EDIT'
              firstName={firstName}
              lastName={lastName}
              phones={phones}
              isLoading={loadingEditContact || loadingEditPhone}
              onChangeFirstName={(value) => setFirstName(value)}
              onChangeLastName={(value) => setLastName(value)}
              onChangePhones={(value, index) => setPhones((prev) => {
                prev[index].value = value;
                return [...prev];
              })}
              onDeletePhone={(index) => setPhones((prev) => {
                const filtered = prev.filter((_value, idx) => idx !== index)
                return filtered;
              })}
              onAddPhone={handleAddPhoneContact}
              onSubmit={() => handleEditContact()}
            />
          </Stack>
        </Stack>
      )}
      {!loadingContactDetail && !contactDetail?.contact_by_pk && (
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

export default ContactEditScreen;
