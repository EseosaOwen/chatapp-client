import Sidebar from "./Sidebar";

export default function Dashboard(props: { id: string }) {
  const { id } = props;
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar id={id} />
    </div>
  );
}
