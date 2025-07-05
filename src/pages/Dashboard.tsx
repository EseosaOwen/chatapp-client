import { useConversations } from "../context/ConversationsProvider";
import OpenConversation from "./OpenConversation";
import Sidebar from "./Sidebar";

export default function Dashboard(props: { id: string }) {
  const { id } = props;
  const { selectedConversation } = useConversations();

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  );
}
