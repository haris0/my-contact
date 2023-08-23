import { useEffect, useState } from "react";
import { Contact } from "../contact-list/contactListEntity";

export const useContactStore = () => {
  const [contactStore, setContactStore] = useState<Contact[]>([]);

  useEffect(() => {
    const dataStore = localStorage.getItem("contactStore");
    if(dataStore) {
      setContactStore(JSON.parse(dataStore))
    }
  }, []);

  const saveContactStore = (contact: Contact) => {
    const existingContact = contactStore.find((cont) => cont.id === contact.id);
    let newContactStore = [...contactStore];

    if(existingContact) {
      newContactStore = newContactStore.filter((cont) => cont.id !== existingContact.id)
    } else {
      newContactStore = [...newContactStore, contact]
    }

    localStorage.setItem("contactStore", JSON.stringify(newContactStore));
    setContactStore(newContactStore)
  }

  const isFavoriteContact = (id: number) => {
    const contactIdx = contactStore.findIndex((cont) => cont.id === id);

    return contactIdx !== -1;
  }

  const unSaveContact = (id: number) => {
    const newContactStore = contactStore.filter((cont) => cont.id !== id);
    localStorage.setItem("contactStore", JSON.stringify(newContactStore));
    setContactStore(newContactStore)
  }

  return { 
    contactStore, 
    saveContactStore, 
    isFavoriteContact,
    unSaveContact
  }
};
