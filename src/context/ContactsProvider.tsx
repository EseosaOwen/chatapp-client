import React, { useContext } from "react";
import { useAccordionButton } from "react-bootstrap";
import useLocalStorage from "../hooks/useLocalStorage";

type TContactsProps = {
  id: string;
  name: string;
};

type TCreateContextProps = any | {
  contacts: [TContactsProps];
  createContact: (id: string, name: string) => void;
};

const ContactsContext = React.createContext<TCreateContextProps>(null);

export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({ children }: { children: React.ReactNode }) {
  const [contacts, setContacts] = useLocalStorage({
    key: "contacts",
    initialValue: [],
  });

  function createContact(id: string, name: string) {
    setContacts((prevContacts: [TContactsProps]) => {
      return [...prevContacts, { id, name }];
    });
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}
