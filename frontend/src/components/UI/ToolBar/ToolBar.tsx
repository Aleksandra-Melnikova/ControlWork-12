import { NavLink } from "react-router-dom";
import "./ToolBar.css";
import UserMenu from "./UserMenu.tsx";
import AnonymousMenu from "./AnonymousMenu.tsx";
import { useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../../features/users/UserSlice.ts';


const ToolBar = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="mb-5">
      <nav className="navbar navbar-expand-lg toolbar-background">
        <div className="container w-75">
          <NavLink to="/">
            <span className="navbar-brand nav-title my-2 pb-2 d-inline-block text-white fs-1">
              Photo gallery
            </span>
          </NavLink>
          <div className="ms-auto">
            <ul className="navbar-nav">
              {user ? (
                <UserMenu image={user.image} username={user.displayName} />
              ) : (
                <AnonymousMenu />
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ToolBar;
