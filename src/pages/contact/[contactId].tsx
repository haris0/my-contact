import { ContactDetailScreen } from "@/screens/contactDetail/ContactDetailScreen";
import { GetStaticPaths, GetStaticProps } from "next";
import getConfig from 'next/config'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const { serverRuntimeConfig } = getConfig();

  return {
    revalidate: serverRuntimeConfig.staticRevalidate,
    props: {}
  };
};

export default function ContactDetail() {
  return <ContactDetailScreen />
};
