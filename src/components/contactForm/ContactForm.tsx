import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, HStack, Input, InputGroup, InputLeftAddon, Stack, Text } from "@chakra-ui/react";

type ContactFormProps = {
  firstName: string;
  lastName: string;
  phones: {
    key: number,
    value: string
  }[];
  onChangeFirstName?: (name: string) => void;
  onChangeLastName?: (name: string) => void;
  onChangePhones?: (phone: string, index: number) => void;
  onAddPhone?: () => void;
  onDeletePhone?: (index: number) => void;
}

export const ContactForm = (props: ContactFormProps) => {
  return (
    <Stack padding={4} spacing={3} marginBottom={4}>
      <HStack>
        <Stack width='full'>
          <Text>First Name: </Text>
          <Input 
            type='Text' 
            placeholder='First Name'
            onChange={(event) => props.onChangeFirstName?.(event.target.value)}
          />
        </Stack>
        <Stack width='full'>
          <Text>Last Name: </Text>
          <Input 
            type='Text' 
            placeholder='Last Name'
            onChange={(event) => props.onChangeLastName?.(event.target.value)}
          />
        </Stack>
      </HStack>
      <Text>Phone Numbers: </Text>
      {props.phones.map((phone, index) => (
        <InputGroup key={phone.key}>
          <InputLeftAddon>+62</InputLeftAddon>
          <Input 
            type='tel'
            placeholder='Phone Number' 
            onChange={(event) => props.onChangePhones?.(event.target.value, index)}
          />
          {index !== 0 && (
            <Button marginLeft={3} colorScheme='red' onClick={() => props.onDeletePhone?.(index)}>
              <DeleteIcon />
            </Button>
          )}
          {index === props.phones.length - 1 && (
            <Button marginLeft={3} onClick={props.onAddPhone}>
              <AddIcon />
            </Button>
          )}
        </InputGroup>
      ))}
      <Button marginTop={8}>
        Save Contact
      </Button>
    </Stack>
  );
};