import { Button, Form, InputGroup } from "react-bootstrap";
import { FormEvent, useState, useCallback } from "react";
import { useConversations } from "../context/ConversationsProvider";

export default function OpenConversation() {
  const [text, setText] = useState("");
  const { sendMessage, selectedConversation } = useConversations();

  const setRef = useCallback((node: any) => {
    if (node) node.scrollIntoView();
  }, []); // TODO ? ask chatgpt to explain this code

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // ! Send Message
    sendMessage(
      selectedConversation.recipients.map(
        (recipient: { id: string; name: string }) => recipient.id
      ),
      text
    );

    // * Clear the Input Field
    setText("");
  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map(
            (
              message: { senderName: string; fromMe: boolean; text: string },
              index: number
            ) => {
              const lastMessage =
                selectedConversation.messages.length - 1 === index;

              return (
                <div
                  ref={lastMessage ? setRef : null} // TODO and here for gpt too
                  key={index}
                  className={`my-1 d-flex flex-column ${
                    message.fromMe ? "align-self-end" : ""
                  }`}
                >
                  <div
                    className={`rounded px-2 py-1 ${
                      message.fromMe ? "bg-primary text-white" : "border"
                    }`}
                  >
                    {message.text}
                  </div>
                  <div
                    className={`text-muted small ${
                      message.fromMe ? "text-end" : ""
                    }`}
                  >
                    {message.fromMe ? "You" : message.senderName}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            <Button type="submit">Send</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
