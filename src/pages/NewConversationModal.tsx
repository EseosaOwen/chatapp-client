import { Modal, Form, Button } from "react-bootstrap";
import { FormEvent, useState } from "react";
import { eventNames } from "process";
import { useContacts } from "../context/ContactsProvider";

type NewConversationsModalType = {
  closeModal: () => void;
};

export default function NewConversationModal({
  closeModal,
}: NewConversationsModalType) {
  const [selectedContactIds, setSelectedContactIds] = useState<
    Array<string> | []
  >([]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handleCheckboxChange(contactId: string) {
    setSelectedContactIds((oldContactIds: string[]) => {
      if (oldContactIds.includes(contactId)) {
        // ! filter the old array by returning all contactId that is not equal to current contact id dand return the filtered array.
        return oldContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      }
      return [...oldContactIds, contactId];
    });
  }

  const { contacts } = useContacts();

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact: { id: string; name: string }) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                // the value is going to be true or false depending on if the current this specific id has been selected or not
                value={(selectedContactIds as any).includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}
