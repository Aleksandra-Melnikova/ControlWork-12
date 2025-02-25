import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectRegisterError, selectRegisterLoading } from "./UserSlice.ts";
import "font-awesome/css/font-awesome.min.css";
import { NavLink } from "react-router-dom";
import { register } from "./UserThunk.ts";
import { RegisterMutation } from "../../types";
import ButtonLoading from "../../components/UI/ButtonLoading/ButtonLoading.tsx";
import FileInput from "../../components/FileInput/FileInput.tsx";

const Register = () => {
  const [form, setForm] = useState<RegisterMutation>({
    username: "",
    password: "",
    image: null,
  });
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const loading = useAppSelector(selectRegisterLoading);
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(form)).unwrap();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = e.target;

    if (files) {
      setForm((prevState: RegisterMutation) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <div className="container-fluid">
      <div className="col-md-7 col-sm-10 col-xl-7 offset-md-4 mx-auto mb-5">
        <div className="form-container">
          <div className="form-icon">
            <i className="fa fa-user"></i>
          </div>
          <h3 className="title">Register</h3>
          <form className="form-horizontal" onSubmit={submitFormHandler}>
            <div className="form-group">
              {getFieldError('username') ? (
                <div
                  className="alert alert-danger w-100 text-center p-1 mx-auto"
                  role="alert"
                >
                  {getFieldError('username')}
                </div>
              ) : null}
              <input
                type="text"
                id="username"
                className={
                  getFieldError('username')
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
                onChange={inputChangeHandler}
                value={form.username}
                name="username"
              />
              <label>username</label>
            </div>
            <div className="form-group">
              {getFieldError('password') ? (
                <div
                  className="alert alert-danger w-100 text-center p-1 mx-auto"
                  role="alert"
                >
                  {getFieldError('password')}
                </div>
              ) : null}
              <input
                type="password"
                id="password"
                className={
                  getFieldError('password')
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
                onChange={inputChangeHandler}
                value={form.password}
                name="password"
              />
              <label>password</label>
            </div>

            <FileInput
              id="image"
              name="image"
              label="Avatar"
              onGetFile={onFileChange}
              file={form.image}
              className={`form-control`}
            />

            <ButtonLoading
              type="submit"
              text={' Sign up'}
              isLoading={loading}
              isDisabled={loading}
            ></ButtonLoading>

            <NavLink
              to={'/login'}
              className={'d-block text-center mt-3 form-link-nav'}
            >
              Already have an account?
              <br/> Sign in
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
