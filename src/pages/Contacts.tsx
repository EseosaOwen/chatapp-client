import { useContacts } from "../context/ContactsProvider";
import { ListGroup } from "react-bootstrap";
export default function Contacts() {
  const { contacts } = useContacts();

  return (
    <ListGroup variant="flush">
      {contacts.map((contact: { id: string; name: string }, index: number) => (
        <ListGroup.Item key={index}>{contact.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}
