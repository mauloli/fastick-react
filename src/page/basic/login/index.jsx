import React, { useState } from "react";
import axios from "../../../utils/axios";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChangeForm = (event) => {
    // console.log("User sedang mengetik");
    // console.log(event.target.name);
    // console.log(event.target.value);
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const resultLogin = await axios.post("auth/login", form);

      setMessage(resultLogin.data.msg);
      //   localStorage.setItem;
    } catch (error) {
      console.log(error.response);
      setIsError(false);
      setMessage(error.response.data.message);
    }
  };

  const handleReset = (event) => {
    event.preventDefault();
    console.log("Reset Form");
  };

  return (
    <div className="text-center container">
      <h1>Login Page</h1>
      {!message ? null : isError ? (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      ) : (
        <div className="alert alert-primary" role="alert">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} onReset={handleReset}>
        <input type="email" placeholder="Input email" name="email" onChange={handleChangeForm} />
        <br />
        <input
          type="password"
          placeholder="Input Password"
          name="password"
          onChange={handleChangeForm}
        />
        <br />
        <button className="btn btn-outline-primary" type="reset">
          Reset
        </button>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
