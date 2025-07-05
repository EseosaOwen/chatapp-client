import React from "react";
import { useConversations } from "../context/ConversationsProvider";
import { ListGroup } from "react-bootstrap";
import { useContacts } from "../context/ContactsProvider";

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations();

  return (
    <ListGroup variant="flush">
      {conversations != null &&
        conversations.map(
          (
            conversation: {
              recipients: { id: string; name: string }[];
              messages: any[];
              selected: boolean;
            },
            index: number
          ) => {
            return (
              <ListGroup.Item
                key={index}
                action
                active={conversation.selected} // ! selected is a boolean variable that is true if the selectedConversationsIndex is the same as the index of the conversation else false.
                onClick={() => selectConversationIndex(index)} // NB when we click we update the selectedConversationIndex to the index
              >
                {conversation.recipients
                  .map((recipient) => recipient.name)
                  .join(", ")}
                {/* // * This will map through the recipients display them on the same line but we join the names with a coma */}
              </ListGroup.Item>
            );
          }
        )}
    </ListGroup>
  );
}
