import React from "react";
import Login from "./pages/Login";
import useLocalStorage from "./hooks/useLocalStorage";
import Dashboard from "./pages/Dashboard";
import { ContactsProvider } from "./context/ContactsProvider";
import { ConversationsProvider } from "./context/ConversationsProvider";

function App() {
  const [id, setId] = useLocalStorage({ key: "id" });
  const dashboard = (
    <ContactsProvider>
      <ConversationsProvider id={id}>
        <Dashboard id={id} />
      </ConversationsProvider>
    </ContactsProvider>
  );

  return <>{id ? dashboard : <Login onIdSubmit={setId} />}</>;
}

export default App;
