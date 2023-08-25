import { Stack } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';

type LayoutProps = {
  children?: ReactNode
}

export const Layout = (props: LayoutProps) => {
  return (
    <Stack alignItems='center' spacing={0}>
      <Stack 
        alignItems='center' 
        paddingY={3}
        borderBottomWidth={2}
        borderBottomColor='teal.900'
        width='full'
      >
        <Link href='/'>
          <Image 
            src='/images/my-contact.png' 
            alt='Cake Story'
            width={150}
            height={100}
            priority
          />
        </Link>
      </Stack>
      <Stack maxWidth={720} width='full'>
        {props.children}
      </Stack>
    </Stack>
  );
};
