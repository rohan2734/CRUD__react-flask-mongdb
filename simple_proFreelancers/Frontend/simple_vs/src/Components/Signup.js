import { React, useEffect, useState } from "react";
import Signupvec from "../Assets/signupvec.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import bgsignup from "../Assets/bgsignup.svg";
import axios from "axios";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

const url = "http://127.0.0.1:5000/api/signup"; //add your url here and it will work

function Signup() {
  const [values, setValues] = useState({
    firstName: "test123",
    lastName: "test123",
    emailID: "test123@gmail.com",
    password: "test123",
    confirmPassword: "test123",
  });
  // const [formvalues,setformValues]=useState();

  const handleChange = (e) => {
    // e.preverntDefault();
    const inpname = e.target.name;
    const inpvalue = e.target.value;

    setValues({ ...values, [inpname]: inpvalue });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.firstName.length < 5) {
      alert("Less characters in firstname (minimum length 6)");
      setValues({ ...values, firstName: "" });
      return;
    }
    if (values.password !== values.confirmPassword) {
      alert("Password and confirm password do not match");
      setValues({ ...values, password: "", confirmPassword: "" });
      return;
    }
    // console.log(values);

    axios.post(`${url}`, values).then((res) => {
      console.log(res.data);
    });
    setValues({
      firstName: "",
      lastName: "",
      emailID: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div>
      <img
        src={bgsignup}
        style={{ position: "relative", left: "-60px", top: "-400px" }}
      />
      <img src={Signupvec} alt="image" className="signvec" />
      <div className="signin">
        <h1 style={{ textAlign: "center", position: "relative", top: "50px" }}>
          <u>Signup</u>
        </h1>
        <p
          style={{
            textAlign: "center",
            position: "relative",
            top: "70px",
            fontWeight: "600",
          }}
        >
          Enter your details to create a free account
        </p>

        <form className="inputs signinp" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="firstName"
              placeholder=" First Name"
              onChange={handleChange}
              value={values.firstName}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder=" Last Name"
              onChange={handleChange}
              value={values.lastName}
              required
            />
          </div>

          <input
            type="email"
            name="emailID"
            placeholder=" Email"
            style={{ width: "425px" }}
            onChange={handleChange}
            value={values.emailID}
            required
          />
          <input
            type="password"
            name="password"
            placeholder=" Password"
            style={{ width: "425px" }}
            onChange={handleChange}
            value={values.password}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder=" Confirm Password"
            style={{ width: "425px" }}
            onChange={handleChange}
            value={values.confirmPassword}
            required
          />

          <button className="buttons btnsgn" type="submit">
            Sign up <FontAwesomeIcon icon={faSignInAlt} />
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            position: "relative",
            bottom: "-150px",
          }}
        >
          Already have an account ?{" "}
          <span>
            <Link to="/login" style={{ color: "#FFC93C" }}>
              Login
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
