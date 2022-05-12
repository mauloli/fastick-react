import React, { useState } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import banner from "../../assets/Group 7.png";
import logo from "../../assets/tickitz 1.png";
import styles from "./Login.module.css";
function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleChangeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const [visible, setVisible] = useState(false);
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const resultLogin = await axios.post("auth/login", form, Headers);
      setMessage(resultLogin.data.msg);
      localStorage.setItem("token", resultLogin.data.data.token);
      localStorage.setItem("refreshToken", resultLogin.data.data.refreshToken);
      const resultUser = await axios.get(`user/${resultLogin.data.data.id}`);
      const dataUser = resultUser.data.data;
      console.log(dataUser);
      localStorage.setItem("dataUser", JSON.stringify(dataUser));
      setMessage(resultLogin.data.msg);
      setIsError(false);
      console.log(dataUser);

      localStorage.setItem("token", resultLogin.data.data.token);
      localStorage.setItem("refreshToken", resultLogin.data.data.refreshToken);

      navigate("/");
    } catch (error) {
      console.log(error.response);

      setMessage(error.response.data.msg);
      setIsError(true);
    }
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  return (
    <div>
      <main className={` ${styles.main}  `}>
        <section className={`${styles.banner}`}>
          <div className={`${styles.banner__overlay}`}>
            <span>
              <img src={logo} alt="" className={`${styles.img_logo}`} />
              <p className={styles.text_span}>wait, watch, wow!</p>
            </span>
          </div>
          <img src={banner} alt="" className={`${styles.banner_img}`} />
        </section>
        <section className={`${styles.form}`}>
          <div className={`${styles.form_main}`}>
            {isError ? (
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            ) : (
              ""
            )}
            <h2 className={styles.textH2}>Sign In</h2>
            <p className={styles.form_text}>
              Sign in with your data that you entered during your registration. email and password
              musth be correct!
            </p>
            <div className={styles.form_input} onKeyDown={handleEnter}>
              <span className={`${styles.span_email}`}>Email</span>
              <input
                type="email"
                name="email"
                placeholder="Write Your Email"
                className={`${styles.input}`}
                onChange={handleChangeForm}
              />
              <span className={`${styles.span_password}`}>Password</span>
              <i
                className={`bi bi-eye-slash ${styles.icon_eye}`}
                id="togglePassword"
                onClick={() => setVisible(!visible)}
              ></i>
              <input
                type={visible ? `text` : `password`}
                name="password"
                placeholder="Write Your Password"
                className={`${styles.input}`}
                onChange={handleChangeForm}
              />
            </div>
            <div className={`${styles.button_main}`}>
              <form onSubmit={handleSubmit} className={styles.formSubmit}>
                <button className={`button ${styles.button2}`} type="submit">
                  Sign in
                </button>
              </form>
            </div>

            <p className={styles.forgot__password}>
              forgot your password? <a href="">reset now</a>
            </p>
            <p className={styles.register__account}>
              dont have an account? <a href="">Sign Up</a>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignIn;
