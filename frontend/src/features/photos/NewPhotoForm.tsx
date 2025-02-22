import React, { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { createPhoto } from './photosThunk.ts';
import { PhotoMutation } from '../../types';
import FileInput from "../../components/FileInput/FileInput.tsx";
import { selectCreateLoading } from "./photosSlice.ts";
import { useNavigate } from "react-router-dom";
import { selectUser } from '../users/UserSlice.ts';
import ButtonLoading from '../../components/UI/ButtonLoading/ButtonLoading.tsx';

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
  // const [error, setError] = useState<boolean>(false);

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();
      dispatch(
        createPhoto({ ...form }),
      );
      setForm(initialState);
      navigate(`/photos?userID=${user?._id}`);

  };

  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
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
              <input
                className={"form-control"}
                id="title"
                name="title"
                required
                value={form.title}
                onChange={inputChangeHandler}
              />
              <label htmlFor={"name"}>Title</label>
            </div>

            <div className={"form-group"}>
              <FileInput
                className={"form-control"}
                id="image"
                name="image"
                label="Image"
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
