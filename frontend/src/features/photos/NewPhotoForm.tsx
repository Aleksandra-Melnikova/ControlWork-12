import React, { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { createPhoto } from "./photosThunk.ts";
import { PhotoMutation } from "../../types";
import FileInput from "../../components/FileInput/FileInput.tsx";
import { selectCreateLoading, selectError } from "./photosSlice.ts";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../users/UserSlice.ts";
import ButtonLoading from "../../components/UI/ButtonLoading/ButtonLoading.tsx";

const initialState = {
  title: "",
  image: null,
};

const NewPhotoForm = () => {
  const [form, setForm] = useState<PhotoMutation>(initialState);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isCreateLoading = useAppSelector(selectCreateLoading);
  const navigate = useNavigate();
  const error = useAppSelector(selectError);

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const submitFormHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createPhoto(form)).unwrap();
      setForm(initialState);
      navigate(`/photos?userID=${user?._id}`);
    } catch (e) {
      console.error(e);
    }
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setForm((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <div className="container-fluid ">
      <div className="col-md-7 col-sm-7 col-xl-7 offset-md-4 mx-auto ">
        <div className="form-container">
          <h3 className="title fs-4">Add new photo</h3>
          <form className="form-horizontal" onSubmit={submitFormHandler}>
            <div className={"form-group"}>
              {getFieldError("title") ? (
                <div
                  className="alert alert-danger w-100 text-center p-1 mx-auto"
                  role="alert"
                >
                  {getFieldError("title")}
                </div>
              ) : null}
              <input
                id="title"
                name="title"
                value={form.title}
                className={
                  getFieldError("title")
                    ? "form-control is-invalid"
                    : "form-control"
                }
                onChange={inputChangeHandler}
              />
              <label htmlFor={"name"}>Title</label>
            </div>

            <div className={"form-group"}>
              {getFieldError("image") ? (
                <div
                  className="alert alert-danger w-100 text-center p-1 mx-auto"
                  role="alert"
                >
                  {getFieldError("image")}
                </div>
              ) : null}
              <FileInput
                id="image"
                name="image"
                label="Image"
                className={
                  getFieldError("image")
                    ? "form-control is-invalid"
                    : "form-control"
                }
                onGetFile={fileEventChangeHandler}
                file={form.image}
              />
            </div>

            <ButtonLoading
              type="submit"
              text={"create"}
              isLoading={isCreateLoading}
              isDisabled={isCreateLoading}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPhotoForm;
