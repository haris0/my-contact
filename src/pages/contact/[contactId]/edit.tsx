import ContactEditScreen from "@/screens/contactEdit/ContactEditScreen";
import { GetStaticPaths, GetStaticProps } from "next";
import getConfig from 'next/config'
import Head from "next/head";

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

export default function ContactEdit() {
  return (
    <>
      <Head>
        <title>Contact Edit</title>
      </Head>
      <ContactEditScreen />
    </>
  )
};
