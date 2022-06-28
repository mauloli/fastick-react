import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/index";
import styles from "./Profile.module.css";
import Footer from "../../components/Footer";
import axios from "../../utils/axios";
function Profile() {
  const dataUser = JSON.parse(localStorage.getItem("dataUser"));
  const cloudinaryImg = process.env.REACT_APP_CLOUDINARY_RES;
  const [tabs, setTabs] = useState("account");
  const [formDetails, setFormDetail] = useState({
    firstName: "",
    lastName: "",
    noTelp: ""
  });
  const [formPassword, setFormPassword] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [detailUser, setDetailUser] = useState({});

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormDetail({ ...formDetails, [name]: value });
  };
  const handleChangePassword = (e) => {
    const { value, name } = e.target;
    setFormPassword({ ...formPassword, [name]: value });
  };
  const getDataUser = async () => {
    try {
      const result = await axios.get(`user/${dataUser.id}`);
      setDetailUser(result.data.data);
      console.log(result.data.data);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const updateDetail = async () => {
    try {
      const result = await axios.patch(`user/${dataUser.id}`, formDetails);
      console.log(result.data.data);
      getDataUser();
      alert(result.data.msg);
      setFormDetail({ ...formDetails, firstName: "", lastName: "", noTelp: "" });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const updatePassword = async () => {
    try {
      if (formPassword.newPassword !== formPassword.confirmPassword) {
        alert("password not match!");
      } else {
        const result = await axios.patch(`user/password/${dataUser.id}`, formPassword);
      }
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    getDataUser();
  }, []);
  console.log(formPassword);
  return (
    <div style={{ backgroundColor: "#F5F6F8", height: "100%" }}>
      <Navbar />
      <main className={`${styles.main} container`}>
        <div className={styles.firstColumns}>
          <div className={styles.imageContainer}>
            <section className={styles.sectionImg}>
              <div className={styles.sectionHeader}>
                <span style={{ color: "#4E4B66" }}>INFO</span>
              </div>
              <div className={styles.sectionBody}>
                <img
                  className={styles.image}
                  src={
                    detailUser.image == false
                      ? require("../../assets/user1.png")
                      : `${cloudinaryImg}${detailUser.image}`
                  }
                  alt=""
                />
                <span className="mt-3 mb-3">{`${detailUser.FirstName} ${detailUser.lastName}`}</span>
                <span className="mt-3 mb-3" style={{ color: "#4E4B66", fontSize: "14px" }}>
                  Moviegoers
                </span>
              </div>
              <hr />
              <div className={`${styles.sectionFooter} mt-4`}>
                <button className=" btn btn-primary" style={{ width: "60%" }}>
                  Logout
                </button>
              </div>
            </section>
          </div>
        </div>
        <div className={styles.secondColumns}>
          <div className={styles.formContainer}>
            <div className={styles.formNavbar}>
              <div>
                <span onClick={() => setTabs("account")}>Account Setting</span>
              </div>
              <span onClick={() => setTabs("history")}>Order History</span>
            </div>
            <div className={`${styles.formDetail} container`}>
              <span className={styles.spanDetail}>Details Information</span>
              <hr />
              <div className=" d-flex">
                <span className={styles.spanDetail} style={{ flex: 1 }}>
                  First Name
                </span>
                <span className={styles.spanDetail} style={{ flex: 1 }}>
                  Last Name
                </span>
              </div>
              <div className=" d-flex">
                <input
                  className={styles.inputDetail}
                  type="text"
                  name="firstName"
                  id=""
                  placeholder="input your first name"
                  onChange={(e) => handleChange(e)}
                  value={formDetails.firstName}
                  style={{ flex: 1 }}
                />
                <input
                  className={styles.inputDetail}
                  name="lastName"
                  type="text"
                  placeholder="input your last name"
                  onChange={(e) => handleChange(e)}
                  value={formDetails.lastName}
                  style={{ flex: 1 }}
                />
              </div>
              <div className=" d-flex">
                <span className={styles.spanDetail} style={{ flex: 1 }}>
                  Email
                </span>
                <span className={styles.spanDetail} style={{ flex: 1 }}>
                  Phone Number
                </span>
              </div>
              <div className=" d-flex">
                <input
                  className={styles.inputDetail}
                  type="text"
                  name=""
                  id=""
                  disabled
                  style={{ flex: 1 }}
                />
                <input
                  className={styles.inputDetail}
                  type="text"
                  name="noTelp"
                  placeholder="input phone number"
                  onChange={(e) => handleChange(e)}
                  value={formDetails.noTelp}
                  style={{ flex: 1 }}
                />
              </div>
            </div>
            <button onClick={updateDetail} className="btn btn-primary">
              Update Changes
            </button>
            <div className={styles.formPrivacy}>
              <span>Account And Privacy</span>
              <hr />
              <div className={styles.privacyContainer}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <span>New Password</span>
                  <input
                    type="password"
                    name="newPassword"
                    className={styles.inputDetail}
                    onChange={(e) => handleChangePassword(e)}
                    value={formPassword.newPassword}
                  />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <span>Confirm Password</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    className={styles.inputDetail}
                    onChange={(e) => handleChangePassword(e)}
                    value={formPassword.confirmPassword}
                  />
                </div>
              </div>
            </div>
            <button onClick={updatePassword} className="btn btn-primary mt-xl-3 mb-xl-3">
              Update Changes
            </button>
          </div>
        </div>
      </main>
      <div className=" pt-1" style={{ backgroundColor: "white" }}>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
