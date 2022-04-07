import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate, Navigate } from "react-router-dom";
import * as Yup from "yup";
import { useEffect } from "react";
import axios from "axios";
import Logo from "../assets/Logo.png";
const Login = ({ authenticate, name, setName }) => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().required(),
    password: Yup.string().required(),
  });

  const onSubmit = async (values, resetForm) => {
    formik.resetForm();
    // console.log(values, "values");

    // navigate("/dashboard");

    const response = await axios({
      method: "post",
      url: "https://ecom-react-task.herokuapp.com/auth/login",
      data: values,
    });
    console.log(response, "response");
    // console.log(response.data.data.token, "token");
    localStorage.setItem("token", JSON.stringify(response?.data?.data?.token));
    authenticate();
    setName(response.data.data.user.name);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,

    validationSchema,
  });
  return (
    <>
      <div className="wrapper ">
        <div className="container d-flex justify-content-center">
          <div className="login">
            <header className="header" id="header">
              <div className="header-image">
                <img src={Logo} alt="" />
              </div>
              <h3 id="heading" className="text-white mt-3">
                Login Page
              </h3>
            </header>
            <form onSubmit={formik.handleSubmit}>
              {/* <div className="headerFormPage  text-primary text-center text-bold">
                <h3 className=" ">Login Page</h3>
              </div> */}
              <div className="">
                <label
                  for="email"
                  className="form-label"
                  style={{ marginRight: "600px" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email ? (
                  <span className="text-danger">{formik.errors.email}</span>
                ) : null}
              </div>
              <div className="mt-4">
                <label
                  for="password"
                  className="form-label"
                  style={{ marginRight: "600px" }}
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password ? (
                  <span className="text-danger">{formik.errors.password}</span>
                ) : null}
              </div>
              <br />
              <a href="">Forgot password?</a>
              <br />
              <button
                type="submit"
                variant="success"
                className="btn btn-primary mt-3"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
