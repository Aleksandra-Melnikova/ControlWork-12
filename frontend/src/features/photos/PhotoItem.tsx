import { apiUrl } from "../../globalConstants.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../users/UserSlice.ts";
import { selectDeleteLoading } from "./photosSlice.ts";
import ButtonLoading from "../../components/UI/ButtonLoading/ButtonLoading.tsx";
import { NavLink } from "react-router-dom";
import Modal from "../../components/UI/Modal/Modal.tsx";
import { useCallback, useState } from "react";
import {
  deletePhoto,
  fetchPhotos,
  fetchPhotosForOneUser,
} from "./photosThunk.ts";

interface Props {
  title: string;
  id: string;
  image: string;
  userName: string;
  userID: string;
  onDelete?: (id: string) => void;
  paramsID: string | null;
}

const PhotoItem: React.FC<Props> = ({
  title,
  id,
  image,
  userName,
  userID,
  onDelete,
  paramsID,
}) => {
  const user = useAppSelector(selectUser);
  const [showModal, setShowModal] = useState<boolean>(false);
  const deleteLoading = useAppSelector(selectDeleteLoading);
  const dispatch = useAppDispatch();
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("userID");

  const fetchAllPhotos = useCallback(() => {
    if (userId) {
      dispatch(fetchPhotosForOneUser(userId));
    } else {
      dispatch(fetchPhotos());
    }
  }, [userId, dispatch]);

  const deleteOnePhoto = async (id: string) => {
    await dispatch(deletePhoto(id));
    void fetchAllPhotos();
  };

  return (
    <>
      {" "}
      <Modal show={showModal} closeModal={() => setShowModal(false)}>
        <div className="text-end">
          <button
            className="btn btn-close"
            onClick={() => setShowModal(false)}
          ></button>
        </div>
        <div className="modal-body d-flex align-items-center justify-content-center overflow: 'hidden">
          <img
            className="card-img-top m-1 mb-0 mt-0  rounded-1"
            style={{
              width: "auto",
              height: "auto",
              maxHeight: "500px",
              objectFit: "contain",
            }}
            src={`${apiUrl}/${image}`}
            alt={title}
          />
        </div>
      </Modal>
      <div className="card " style={{ width: "250px", minHeight: "320px" }}>
        <div
          onClick={() => setShowModal(true)}
          className=" d-block w-100 h-75 d-flex align-items-center rounded-2 mb-0  "
          style={{ width: "250px", minHeight: "150px", overflow: "hidden" }}
        >
          <img
            className="card-img-top m-1 mb-0 mx-auto rounded-1"
            style={{
              width: "98%",
              height: "150px",
              objectFit: "cover",
              overflow: "hidden",
            }}
            src={`${apiUrl}/${image}`}
            alt={title}
          />
        </div>
        <div className="card-body d-flex flex-column align-items-center">
          <h5
            onClick={() => setShowModal(true)}
            className="card-title text-center fw-normal pt-0 fs-4"
          >
            {title}
          </h5>
          <h4 className={"text-secondary fw-light fs-5 m-0"}>
            {" "}
            By:{" "}
            <NavLink to={`/photos?userID=${userID}`} className={"color"}>
              {userName}
            </NavLink>{" "}
          </h4>
          {user?.role === "admin" && onDelete ? (
            <div className={"mt-auto"}>
              <ButtonLoading
                isLoading={deleteLoading}
                isDisabled={deleteLoading}
                text={"Delete"}
                type={"button"}
                onClick={() => onDelete(id)}
              />
            </div>
          ) : null}
          {user?.role === "user" && user?._id === paramsID ? (
            <div className={"mt-auto"}>
              <ButtonLoading
                isLoading={deleteLoading}
                isDisabled={deleteLoading}
                text={"Delete"}
                type={"button"}
                onClick={() => deleteOnePhoto(id)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default PhotoItem;
