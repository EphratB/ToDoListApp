import PageContainer from "../../components/PageContainer";
import { NavLink, Outlet } from "react-router-dom";
import "./styles.scss";

export default function HelpPage() {
  return (
    <PageContainer title="About Us" className="about-us-page">
      <article>
        <Outlet />
      </article>
      <aside className="side-menu">
        <NavLink to="/help">Introduction</NavLink>
        <NavLink to="/help/addtask">Adding Tasks</NavLink>
        <NavLink to="/help/removetask">Removing Tasks</NavLink>
        <NavLink to="/help/changetask">Changing Tasks</NavLink>
      </aside>
    </PageContainer>
  );
}
