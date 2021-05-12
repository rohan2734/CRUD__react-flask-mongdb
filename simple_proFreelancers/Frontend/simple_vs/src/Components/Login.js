import React, { useState } from "react";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import Vector from "../Assets/vector1.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

const url = "http://127.0.0.1:5000/api/login"; //add url here
function Login(props) {
  const [details, setDetails] = useState({
    emailID: "",
    password: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetails({ ...details, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(details);
    // const config = {
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // };
    axios
      .post(`${url}`, details)
      .then((res) => {
        console.log(res.data);
        //add the conditions here,
        //if the login is successful (condition 1)
        onLogin(details.emailID); //then execute this
        //else do alert here
      })
      .catch((err) => console.log(err));

    const onLogin = (emailID) => {
      props.onLogin(emailID);
    };
    setDetails({
      emailID: "",
      password: "",
    });
  };
  return (
    <div className="mainlogin">
      <img src={Vector} alt="image" className="vec1" />
      <div className="login">
        <h1 style={{ textAlign: "center", position: "relative", top: "50px" }}>
          <u>Login</u>
        </h1>
        <p
          style={{
            textAlign: "center",
            position: "relative",
            top: "70px",
            fontWeight: "600",
          }}
        >
          Login to your account
        </p>
        <form className="inputs" onSubmit={handleSubmit}>
          <input
            type="email"
            name="emailID"
            placeholder="Email"
            onChange={handleChange}
            value={details.emailID}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            value={details.password}
          />
          <button className="buttons btnsgn" type="submit">
            Login <FontAwesomeIcon icon={faSignInAlt} />
          </button>
        </form>
        <p
          style={{
            textAlign: "center",
            position: "relative",
            bottom: "-150px",
          }}
        >
          Don't have an account ?{" "}
          <span>
            {" "}
            <Link to="/" style={{ color: "#FFC93C" }}>
              Signup
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (emailID) => dispatch({ type: "ON_LOGIN", emailID: emailID }),
  };
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    UserEmailID: state.UserEmailID,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
