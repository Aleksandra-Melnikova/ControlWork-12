import { NavLink } from "react-router-dom";
import "./ToolBar.css";

import { useSelector } from "react-redux";
import { useAppDispatch } from '../../../app/hooks.ts';
import { selectUser, unsetUser } from '../../../features/users/UserSlice.ts';
import { logout } from '../../../features/users/UserThunk.ts';
import { apiUrl } from '../../../globalConstants.ts';

export interface UserMenuProps {
  username: string;
  image: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ username, image }) => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const HandleLogout = () => {
    dispatch(logout());
    dispatch(unsetUser());
  };
  return (
    <div>
      <li className="nav-item fs-5">
        <div className={"d-flex"}>
          <div className={"ms-auto"}>
            <p className={"d-inline-block text-white ms-2 mt-3 mb-0"}>
              Привет, <NavLink className={'text-white fw-normal'} to={`/photos?userID=${user?._id}`}>{username}! </NavLink>
            </p>
            {user?.googleID ? (
              <>
                <div className={" ms-4 d-inline-block img-block"}>
                  <img
                    className={"img-user"}
                    src={
                      image
                        ? image
                        : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt={username}
                  />
                </div>
              </>
            ) : (
              <div className={" ms-4 d-inline-block img-block"}>
                <img
                  className={"img-user"}
                  src={`${apiUrl}/${image}`}
                  alt={username}
                />
              </div>
            )}
          </div>
        </div>
        <NavLink
          className={`mb-2 mt-1 d-inline-block nav-link nav-link-tool text-white border border-1 border-white rounded-2 mx-1  p-2`}
          to={`/photos?userID=${user?._id}`}
        >
          My photo
        </NavLink>
        <button
          type={"button"}
          onClick={HandleLogout}
          className={`mb-2 mt-1 d-inline-block nav-link nav-link-tool text-white border border-1 border-white rounded-2 mx-1   p-2`}
        >
          Logout
        </button>
      </li>
    </div>
  );
};

export default UserMenu;
