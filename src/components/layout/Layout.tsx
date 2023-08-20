import { Stack } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';

type LayoutProps = {
  children?: ReactNode
}

export const Layout = (props: LayoutProps) => {
  return (
    <Stack alignItems='center'>
      <Stack maxWidth={720} width='full'>
        <Stack alignItems='center' marginTop={4}>
          <Link href='/'>
            <Image 
              src='/images/my-contact.png' 
              alt='Cake Story'
              width={150}
              height={100}
            />
          </Link>
        </Stack>
        {props.children}
      </Stack>
    </Stack>
  );
};
