import { ReactNode } from 'react';
import { Avatar, Stack } from '@chakra-ui/react';

type HeaderWithAvaProps = {
  name?: string;
  children?: ReactNode
}

export const HeaderWithAva = (props: HeaderWithAvaProps) => {
  return (
    <>
      <Stack
        width='full'
        height={24}
        backgroundColor='gray.700'
        padding={2}
        alignItems='flex-end'
      >
        {props.children}
      </Stack>
      <Stack marginTop={-14} width='full'>
        <Avatar 
          name={props.name}
          size='xl'
          alignSelf='center'
        />
      </Stack>
    </>
  );
};
