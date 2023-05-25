import MainMenu from "../MainMenu";
import "./styles.scss";
import { MdAddTask } from "react-icons/md";

function Header() {
  return (
    <>
      <header>
        <div className="title">
          <MdAddTask /> To-Do with e'
        </div>
        <div className="author">by Ephrat Belaineh</div>
      </header>
      <div>
        <MainMenu />
      </div>
    </>
  );
}
export default Header;
