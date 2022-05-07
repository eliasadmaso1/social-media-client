import React, { useContext, useRef } from "react";
import "./Auth.css";
import { LoginUser } from "../../Components/Service/auth-service";
import { AuthContext } from "../../Components/Context/Auth-context";
import CircularProgress from "@mui/material/CircularProgress";
import {Link} from 'react-router-dom';

function Login() {
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const email = useRef();
  const password = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    LoginUser(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  console.log("====================================");
  console.log({ user });
  console.log("====================================");

  return (
    <div className="body">
    <div className="container">
      <form id="form" className="form">
        <h2>Login</h2>
        <div className="form-control">
          <label for="email">Email</label>
          <input ref={email} type="text" id="email" placeholder="Enter email" />
        </div>
        <div className="form-control">
          <label for="password">Password</label>
          <input
            ref={password}
            type="password"
            id="password"
            placeholder="Enter password"
          />
        </div>
        <button onClick={handleClick} className="auth-btn">
          {isFetching ? <CircularProgress color="inherit" style={{fontSize:"15"}}/> : "Login"}
        </button>
        <Link to="/register" style={{textDecoration:"none"}}>
        <button className="new-account">
          Create New Account
        </button></Link>
       

      </form>
    </div>
    </div>
  );
}

export default Login;
