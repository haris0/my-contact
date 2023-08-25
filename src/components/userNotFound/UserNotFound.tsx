import { Stack, Text } from "@chakra-ui/react";
import Image from 'next/image';

export const UserNotFound = () => {
  return (
    <Stack width='full' alignItems='center' paddingY={14} spacing={6}>
      <Image
        src='/images/page-not-found.png' 
        alt='user not found'
        width={150}
        height={100}
      />
      <Text>User Not Found</Text>
    </Stack>
  );
};
