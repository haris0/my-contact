import { ContactLisScreen } from "@/screens/contactList/ContactListScreen"
import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact List</title>
      </Head>
      <ContactLisScreen />
    </>
  );
}
