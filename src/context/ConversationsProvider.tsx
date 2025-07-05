import React, { useContext, useState } from "react";
import { useAccordionButton } from "react-bootstrap";
import useLocalStorage from "../hooks/useLocalStorage";
import Conversations from "../pages/Conversations";
import { useContacts } from "./ContactsProvider";
import { NoSubstitutionTemplateLiteral } from "typescript";

type TConversationsProps = {
  recipients: string[];
  messages: any[];
};

type TCreateContextProps =
  | any
  | {
      conversations: [TConversationsProps];
      createConversations: (recipient: string[]) => void;
    };

const ConversationsContext = React.createContext<TCreateContextProps>(null);

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const [conversations, setConversations] = useLocalStorage({
    key: "conversations",
    initialValue: [],
  });

  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  const { contacts } = useContacts();

  function createConversation(recipients: string[]) {
    setConversations((preConversations: [TConversationsProps]) => {
      const newConversation: TConversationsProps[] = [
        ...preConversations,
        { recipients, messages: [] },
      ];
      return newConversation;
    });
  }

  function addMessageToConversation({
    recipients,
    text,
    sender,
  }: {
    recipients: string[];
    text: string;
    sender: string;
  }) {
    setConversations((prevConversations: TConversationsProps[]) => {
      // * create a variable that will determine between a newConversation or oldConversatrion
      let madeChange = false;
      // * create a variable to hold the new message
      const newMessage = { sender, text };

      // ! newConversations to store all the conversations including the updated conversation
      const newConversations = prevConversations.map((conversation) => {
        // * check whether the conversations recipients are the same as this recipients that is passed down
        if (arrayEquality(conversation.recipients, recipients)) {
          // * we set the madeChange to true
          madeChange = true;
          // * return a new conversation that contains the newMessage
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          };
        }
        // * else then we just return the conversation as is
        return conversation;
      });

      // * if the made change is true we return the newlyUpdated Conversation
      // NB Meaning that the conversation is an existing one that he just be updated
      if (madeChange) {
        return newConversations;
      } else {
        // ! else we return a newConversation
        return [...prevConversations, { recipients, messages: [newMessage] }];
      }
    });
  }

  function sendMessage(recipients: string[], text: string) {
    addMessageToConversation({ recipients, text, sender: id });
  }

  // ! Store a new formated recipients array
  const formattedConversations = conversations.map(
    (conversation: TConversationsProps, index: number) => {
      // * loop through each recipient
      const recipients = conversation.recipients.map((recipient) => {
        // * find the contact whoose contact.id is the same as the recipient
        const contact = contacts.find(
          (contact: { id: string; name: string }) => contact.id === recipient
        );
        // * store either the name of the contact if there is a name or store the recipient itself
        const name = (contact && contact.name) || recipient;
        // * return a new object instead of a string unlike before
        return { id: recipient, name: name };
      });

      // * formatting the messsages to include the senders name and boolean to determine the sender
      const messages = conversation.messages.map((message) => {
        // NB To retrieve the name we need to find the contact.id that is equal to the message.sender(which is also an id)
        const contact = contacts.find(
          (contact: { id: string; name: string }) => {
            return contact.id === message.sender;
          }
        );
        
        // ! if contact is found we set the name to it or just the message.sender back.
        const name = (contact && contact.name) || message.sender;
        // NB This is a boolean that determines whether the message was sent from this current user or not(this will be used for styling later on)
        const fromMe = id === message.sender;

        // ! Then return a new formatted object for a particular message
        return { senderName: name, ...message, fromMe };
      });

      // ! check if the index of this conversation is selected or click, if it is then return the selected which is a boolean of either true or false
      const selected = index === selectedConversationIndex;
      // * return an object that spreads the message and contains the new formatted recipients
      return { ...conversation, messages, recipients, selected };
    }
  );

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

function arrayEquality(conversationRecipients: string[], recipients: string[]) {
  if (conversationRecipients.length !== recipients.length) return false;

  // * Makes sure to set each array in place, so that we can compare each one without any issues
  conversationRecipients.sort();
  recipients.sort();

  // ! The every function is used to determine if all members in an array match the specific query/test
  return conversationRecipients.every((element, index) => {
    return element === recipients[index];
  });
}
