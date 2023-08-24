import { ContactForm } from "@/components/contactForm/ContactForm";
import { useAddContact } from "@/modules/contact-add/contactAddHooks";
import { useContactList } from "@/modules/contact-list/contactListHooks";
import { containsSpecialChars } from "@/shared/utils";
import { Stack, Avatar, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export const ContactAddScreen = () => {
  const router = useRouter();
  const toast = useToast();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phones, setPhones] = useState([
    {
      key: 1,
      value: ''
    }
  ]);

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

  const { addContact, loading } = useAddContact({
    onCompleted() {
      toast({
        title: 'Success Save Contact',
        status: 'success',
        isClosable: true,
      })
      router.replace('/');
    },
    onError(error) {
      toast({
        title: error.message,
        status: 'error',
        isClosable: true,
      })
    },
  });

  const handleSaveContact = async () => {
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
    if(data.contact.length > 0) {
      toast({
        title: 'Name must be unique',
        status: 'error',
        isClosable: true,
      })
      return;
    }

    // Save contact
    addContact({
      firstName,
      lastName,
      phones: phones.map((phone) => ({
        number: phone.value
      }))
    })
  }


  return (
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
          firstName={firstName}
          lastName={lastName}
          phones={phones}
          isLoading={loading}
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
          onAddPhone={() => setPhones((prev) => [
            ...prev,
            {
              key: (prev[prev.length -1].key || 0) + 1,
              value: ''
            }
          ])}
          onSubmit={() => handleSaveContact()}
        />
      </Stack>
    </Stack>
  );
};
