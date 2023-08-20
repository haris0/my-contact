import { Avatar, Card, CardBody, HStack, Stack, Text } from "@chakra-ui/react";

type ContactCardProps = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export const ContactCard = (props: ContactCardProps) => {
  return (
    <Card variant='filled'>
      <CardBody>
        <HStack spacing={4}>
          <Avatar name={props.firstName+" "+props.lastName} />
          <Stack spacing={0}>
            <Text>
              {props.firstName} {props.lastName}
            </Text>
            <Text>
              {props.phoneNumber}
            </Text>
          </Stack>
        </HStack>
      </CardBody>
    </Card>
  );
};
