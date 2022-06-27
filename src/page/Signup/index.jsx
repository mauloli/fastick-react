import React, { useState } from "react";
import styles from "./Register.module.css";
import logo from "../../assets/tickitz 1.png";
import banner from "../../assets/Group 7.png";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../stores/action/auth";
import { Link } from "react-router-dom";
function SignUp() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    noTelp: "",
    email: "",
    password: ""
  });
  const [visible, setVisible] = useState(false);
  const handleChangeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(registerUser(form));
  };
  return (
    <div>
      <main className={styles.main}>
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
            {/* {isError ? (
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            ) : (
              ""
            )} */}
            <h2 className={styles.textH2}>Sign Up</h2>
            <p className={styles.form_text}>
              Sign in with your data that you entered during your registration. email and password
              musth be correct!
            </p>
            <div className={styles.form_input}>
              <span className={`${styles.span_email}`}>First Name</span>
              <input
                type="text"
                name="firstName"
                placeholder="Write Your Email"
                className={`${styles.input}`}
                onChange={(e) => handleChangeForm(e)}
              />
              <span className={`${styles.span_email}`}>Last Name</span>
              <input
                type="text"
                name="lastName"
                placeholder="Write Your Email"
                className={`${styles.input}`}
                onChange={(e) => handleChangeForm(e)}
              />
              <span className={`${styles.span_email}`}>Phone Number</span>
              <input
                type="text"
                name="noTelp"
                placeholder="Write Your Email"
                className={`${styles.input}`}
                onChange={(e) => handleChangeForm(e)}
              />
              <span className={`${styles.span_email}`}>Email</span>
              <input
                type="email"
                name="email"
                placeholder="Write Your Email"
                className={`${styles.input}`}
                onChange={(e) => handleChangeForm(e)}
              />
              <span className={`${styles.span_password}`}>Password</span>
              <i
                className={`bi bi-eye-slash ${styles.icon_eye}`}
                id="togglePassword"
                onChange={(e) => handleChangeForm(e)}
              ></i>
              <input
                type={visible ? `text` : `password`}
                name="password"
                placeholder="Write Your Password"
                className={`${styles.input}`}
                onChange={(e) => handleChangeForm(e)}
              />
            </div>
            <div className={`${styles.button_main}`}>
              <form onSubmit={handleSubmit} className={styles.formSubmit}>
                <button className={`button ${styles.button2}`} type="submit">
                  Sign Up
                </button>
              </form>
            </div>

            <p className={styles.forgot__password}>
              forgot your password? <a href="">reset now</a>
            </p>
            <p className={styles.register__account}>
              already have an account? <Link to={`/login`}>Sign In</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignUp;
