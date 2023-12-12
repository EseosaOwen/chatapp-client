import { Modal, Form, Button } from "react-bootstrap";
import { FormEvent, useRef } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "../context/ContactsProvider";

type NewContactModalType = {
  closeModal: () => void;
};

export default function NewContactModal({ closeModal }: NewContactModalType) {
  const idRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const { createContact } = useContacts();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    createContact(
      (idRef as React.MutableRefObject<HTMLInputElement>).current?.value,
      (nameRef as React.MutableRefObject<HTMLInputElement>).current?.value
    );
    closeModal();
  }

  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" ref={idRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}
