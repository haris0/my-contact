import { ContactForm } from "@/components/contactForm/ContactForm";
import { Stack, Avatar } from "@chakra-ui/react";
import { useState } from "react";

export const ContactAddScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phones, setPhones] = useState([
    {
      key: 1,
      value: ''
    }
  ]);

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
          onChangeFirstName={(value) => setFirstName(value)}
          onChangeLastName={(value) => setLastName(value)}
          onChangePhones={(value, index) => setPhones((prev) => {
            prev[index].value = value;
            return prev;
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
        />
      </Stack>
    </Stack>
  );
};
