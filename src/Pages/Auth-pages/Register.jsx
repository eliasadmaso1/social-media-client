import React, { useRef } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Link} from 'react-router-dom';
import {server_url} from '../../utils';

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    try {
      await axios.post(`${server_url}auth/register`, user);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="body">
    <div className="container">
      <form id="form" className="form">
        <h2>Register With Us</h2>
        <div className="form-control">
          <label for="username">Username</label>
          <input type="text" placeholder="Enter username" ref={username} />
        </div>
        <div className="form-control">
          <label for="email">Email</label>
          <input type="text" placeholder="Enter email" ref={email} />
        </div>
        <div className="form-control">
          <label for="password">Password</label>
          <input type="password" placeholder="Enter password" ref={password} />
        </div>
        <button className="auth-btn" onClick={handleClick}>
          Sign Up
        </button>
        <Link to="/login" style={{textDecoration:"none",color:"white"}}>
        <button className="new-account">
          Login
        </button></Link>
       
      </form>
    </div>
    </div>
  );
}

export default Register;
