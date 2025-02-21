import { LoginMutation } from "../../types";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectLoginError,
  selectLoginLoading,
} from "./UserSlice.ts";
import { NavLink, useNavigate } from "react-router-dom";
import { googleLogin, login } from "./UserThunk.ts";
import ButtonLoading from "../../components/UI/ButtonLoading/ButtonLoading.tsx";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [form, setForm] = useState<LoginMutation>({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const loginError = useAppSelector(selectLoginError);
  const navigate = useNavigate();
  const loading = useAppSelector(selectLoginLoading);
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(login(form)).unwrap();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };
  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate("/");
  };

  return (
    <div className="container-fluid">
      <div className="col-md-7 col-sm-10 col-xl-7 offset-md-4 mx-auto">
        <div className="form-container">
          <div className="form-icon">
            <i className="fa fa-user"></i>
          </div>
          <h3 className="title">Login</h3>
          <form className="form-horizontal" onSubmit={submitFormHandler}>
            <div className={"d-flex justify-content-center  mb-3 rounded-3 "}>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  if (credentialResponse.credential) {
                    void googleLoginHandler(credentialResponse.credential);
                  }
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
            <div className="form-group">
              {loginError ? (
                <div
                  className="alert alert-danger w-100 text-center p-1 mx-auto"
                  role="alert"
                >
                  {loginError.error}
                </div>
              ) : null}
              <input
                type="text"
                id="email"
                className={"form-control"}
                onChange={inputChangeHandler}
                value={form.email}
                name="email"
              />
              <label>email</label>
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                className={"form-control"}
                onChange={inputChangeHandler}
                value={form.password}
                name="password"
              />
              <label>password</label>
            </div>
            <ButtonLoading
              type="submit"
              text={"Sign in"}
              isLoading={loading}
              isDisabled={loading}
            ></ButtonLoading>
            <NavLink
              to={"/register"}
              className={"d-block text-center mt-3 form-link-nav"}
            >
              Don't have an account yet? Register
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
