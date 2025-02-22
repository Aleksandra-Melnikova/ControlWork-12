import { NavLink } from "react-router-dom";
import "./ToolBar.css";
const AnonymousMenu = () => {
  return (
    <div>
      <li className="nav-item fs-4">
        <NavLink
          className={`nav-link mb-2 mt-2 text-white d-inline-block link-tool`}
          to={"/register"}
        >
          Sign up
        </NavLink>
        <span className={"text-white "}> or </span>
        <NavLink
          to={"/login"}
          className={`nav-link mb-2 mt-2 text-white d-inline-block link-tool`}
        >
          Sign in
        </NavLink>
      </li>
    </div>
  );
};

export default AnonymousMenu;
